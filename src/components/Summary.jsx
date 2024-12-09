import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  Grid2 as Grid,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { MuiMarkdown, getOverrides } from "mui-markdown";
import axios from "axios";

const Summary = ({ selectedFiles, language, handleFeedback, data }) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMarkdownFiles = async () => {
    try {
      const selectedFileData = data.filter((file) =>
        selectedFiles.includes(file.id)
      );

      const markdownTexts = selectedFileData.map((file) => file.md_content);
      const combinedText = markdownTexts.join("\n\n");

      console.log(language);
      let prompt;
      if (language == "en") {
        prompt = `
          Summarize the following text in English using organized headings and bullet points.
          Add Markdown tables for key data if applicable.
          ${combinedText}
        `;
      } else {
        prompt = ` قم بتلخيص النص التالي باللغة العربية مع استخدام نقاط وعناوين منظمة وشاملة.
            إذا كان ذلك مناسبًا، أضف جداول بتنسيق Markdown لعرض البيانات الهامة.
            ${combinedText}
            `;
      }
      console.log(selectedFiles);

      console.log("Prompt for summarization:", prompt);

      return prompt; // Return the prompt for further use
    } catch (error) {
      console.error("Error processing Markdown content:", error);
      throw new Error("Error processing Markdown content.");
    }
  };

  // Function to fetch the summary using the Gemini API
  const fetchSummary = async () => {
    setLoading(true);
    try {
      // Fetch the combined Markdown content as a prompt
      const prompt = await fetchMarkdownFiles();

      // Make the API call to summarize the content
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
      });

      // Display feedback and update the summary state
      handleFeedback("success", t("summary_success_message"));
      setSummary(response.data.candidates[0].content.parts[0].text);

      console.log("Summary Response:", response);
    } catch (error) {
      console.error("Error fetching summary:", error);
      handleFeedback("error", t("summary_error_message"));
    } finally {
      setLoading(false); // Always execute after try or catch
    }
  };

  const { t } = useTranslation();
  return (
    <Grid item size={7}>
      <Card variant="outlined" style={{ padding: 16, height: "100%" }}>
        <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
          {t("summary_label")}
        </Typography>
        {!loading ? (
          <Button
            disabled={selectedFiles.length === 0}
            onClick={fetchSummary}
            style={{ marginTop: 16 }}
            sx={{
              backgroundColor: "#2683e8",
              padding: "8px 12px",
              borderRadius: 2,
              color: "white",
              fontWeight: "bold",
              "&.Mui-disabled": {
                backgroundColor: "#E0E0E0",
                color: "#B1ACA6",
              },
            }}
          >
            {t("summarize_button_text")}
          </Button>
        ) : (
          <CircularProgress size="30px" sx={{ marginTop: 2 }} />
        )}

        <Typography sx={{ padding: "12px", marginTop: "12px" }}>
          <MuiMarkdown
            overrides={{
              ...getOverrides({}), // This will keep the other default overrides.
              h1: {
                component: "p",
                props: {
                  style: {
                    fontSize: "32px",
                    fontWeight: "bold",
                    wordSpacing: "-0.1em",
                    margin: "8px 0",
                  },
                },
              },
              h2: {
                component: "p",
                props: {
                  style: {
                    fontSize: "24px",
                    fontWeight: "bold",
                    wordSpacing: "-0.1em",
                    margin: "4px 0",
                  },
                },
              },
              h3: {
                component: "p",
                props: {
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    wordSpacing: "-0.1em",
                    margin: "4px 0",
                  },
                },
              },

              p: {
                component: "p",
                props: {
                  style: {
                    // marginTop: "4px",
                  },
                },
              },
              ul: {
                component: "p",
                props: {
                  style: {
                    marginRight: "12px",
                  },
                },
              },
            }}
          >
            {summary}
          </MuiMarkdown>
        </Typography>
      </Card>
    </Grid>
  );
};

export default Summary;
