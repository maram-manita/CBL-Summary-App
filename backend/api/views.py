from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import google.generativeai as genai

import os

# Configure Google Generative AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

class SummarizeMarkdown(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            text = request.data.get("text", "")
            language = request.data.get("language", "English")

            if not text:
                return Response({"error": "No text provided."}, status=400)

            # Define the prompt based on the language
            if language == "English":
                prompt = f"""
                Summarize the following text in English using organized headings and bullet points.
                Add Markdown tables for key data if applicable.
                {text}
                """
            else:
                prompt = f"""
                قم بتلخيص النص التالي باللغة العربية مع استخدام نقاط وعناوين منظمة وشاملة.
                إذا كان ذلك مناسبًا، أضف جداول بتنسيق Markdown لعرض البيانات الهامة.
                {text}
                """

            # Generate the summary with streaming support
            response = gemini_model.generate_content(prompt, stream=True)
            summary = []

            # Collect the streamed response
            for chunk in response:
                if hasattr(chunk, 'text'):
                    summary.append(chunk.text)

            # Combine the streamed summary into one
            return Response({"summary": "".join(summary)}, status=200)

        except Exception as e:
            return Response({"error": f"Summarization failed: {str(e)}"}, status=500)
        

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
