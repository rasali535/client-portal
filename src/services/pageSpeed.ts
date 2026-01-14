
export interface PageSpeedResult {
    seoScore: number;
    performanceScore: number;
    loading: boolean;
    error?: string;
}

export const fetchPageSpeedData = async (domain: string): Promise<PageSpeedResult> => {
    try {
        // Ensure protocol is present
        const url = domain.startsWith('http') ? domain : `https://${domain}`;

        // Construct API URL
        // We request categories: 'seo', 'performance'
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=seo&category=performance&strategy=mobile`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Extract scores (0-1 scale, so we multiply by 100)
        const seoScore = Math.round((data.lighthouseResult?.categories?.seo?.score || 0) * 100);
        const performanceScore = Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100);

        return {
            seoScore,
            performanceScore,
            loading: false
        };

    } catch (error: any) {
        console.error("Error fetching PageSpeed data:", error);
        return {
            seoScore: 0,
            performanceScore: 0,
            loading: false,
            error: error.message
        };
    }
};
