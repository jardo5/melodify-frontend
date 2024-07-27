export interface SentimentAnalysis {
  sentiment_analysis: {
    overall_mood: string;
    moods: string[];
    analysis: {
      theme: string;
      tone: string;
      narrative: string;
    };
  };
}
