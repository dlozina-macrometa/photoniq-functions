export async function GET(request: Request) {
    const MACROMETA_API_KEY = 'T-N6hawtbgHkaiKn2hiagdw-.func.XdGYfFe0x3AUz4Hs44AQRv3ADwHTtojjL2EfZZVWZ4PRjyo9loaNjw2jmsCC428X8c7b35';
    const BASE_URL = 'https://api-qapgdn.eng.macrometa.io';
    
    const url = new URL(request.url);
    const variantKey = url.searchParams.get('x-demo-variant') || 'b';

    const endpoints = {
        variants: `${BASE_URL}/_fabric/_system/_api/document/variations/var?strongConsistency=false`,
        metrics: `${BASE_URL}/_fabric/_system/_api/document/metrics/${variantKey}?strongConsistency=false`,
        updateMetrics: `${BASE_URL}/_fabric/_system/_api/document/metrics/${variantKey}?keepNull=false&mergeObjects=true&ignoreRevs=true&returnOld=false&returnNew=false&silent=true&strongConsistency=false&waitForSync=false`,
    };

    const headers = {
        common: {
            Authorization: `apikey ${MACROMETA_API_KEY}`,
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
        },
        patch: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const variants = await fetchData(endpoints.variants, headers.common);
        const metrics = await fetchData(endpoints.metrics, headers.common);

        const updatedMetrics = metrics.count + 1;
        await updateData(endpoints.updateMetrics, headers.common, headers.patch, updatedMetrics);

        const redirectUrl = variants[variantKey];
        if (!redirectUrl) {
            throw new Error(`Variant key '${variantKey}' not found in variations`);
        }

        return new Response(null, {
            status: 302,
            headers: { Location: redirectUrl },
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response('Error fetching data', { status: 500 });
    }
}

interface Headers {
    [key: string]: string;
}

interface Metrics {
    count: number;
}

async function fetchData(url: string, headers: Headers): Promise<any> {
    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
}

async function updateData(url: string, commonHeaders: Headers, patchHeaders: Headers, count: number): Promise<void> {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: { ...commonHeaders, ...patchHeaders },
        body: JSON.stringify({ count }),
    });
    if (!response.ok) {
        throw new Error(`Failed to update data: ${response.statusText}`);
    }
}
