// Developer name to ID mapping based on API response
// This maps common developer names to their UUIDs from the developers API

export interface DeveloperInfo {
  id: string;
  name: string;
  projectCount: number;
}

// Developer name to ID mapping
// Based on the developers API response structure
export const DEVELOPER_NAME_TO_ID: { [key: string]: string } = {
  // Emaar
  "EMAAR": "92dde485-13ef-49f8-bb81-647df65a0635",
  "EMAAR PROPERTIES": "92dde485-13ef-49f8-bb81-647df65a0635",
  "EMAAR PROPERTIES (P.J.S.C)": "92dde485-13ef-49f8-bb81-647df65a0635",
  "EMAAR GROUP": "92dde485-13ef-49f8-bb81-647df65a0635",
  
  // DAMAC
  "DAMAC": "001aaabb-61ea-40bd-b393-f867df318071",
  "DAMAC PROPERTIES": "001aaabb-61ea-40bd-b393-f867df318071",
  "DAMAC PROPERTIES DUBAI CO P.S.C.": "001aaabb-61ea-40bd-b393-f867df318071",
  "DAMAC GROUP": "001aaabb-61ea-40bd-b393-f867df318071",
  
  // Azizi
  "AZIZI": "140b41c3-33b3-406b-bb60-20a66b16daa7",
  "AZIZI DEVELOPMENTS": "140b41c3-33b3-406b-bb60-20a66b16daa7",
  "AZIZI DEVELOPMENTS L.L.C": "140b41c3-33b3-406b-bb60-20a66b16daa7",
  "AZIZI PROPERTIES": "140b41c3-33b3-406b-bb60-20a66b16daa7",
  
  // Tiger Properties
  "TIGER PROPERTIES": "07a098a2-b96a-4184-a223-560445da95c2",
  "TIGER": "07a098a2-b96a-4184-a223-560445da95c2",
  
  // Object One
  "OBJECT ONE": "647fbca1-372f-42cc-80fa-7675314e2314",
  "OBJECT ONE REAL ESTATE DEVELOPMENT L.L.C": "647fbca1-372f-42cc-80fa-7675314e2314",
  
  // A D E Properties
  "A D E PROPERTIES": "58693d2a-b1da-499a-b625-0504c7840698",
  "ADE PROPERTIES": "58693d2a-b1da-499a-b625-0504c7840698",
  
  // BNW Developments
  "BNW DEVELOPMENTS": "79117414-0f38-4475-b208-9b7381707995",
  "BNW": "79117414-0f38-4475-b208-9b7381707995",
  
  // A B A Real Estate Development
  "A B A REAL ESTATE DEVELOPMENT": "d0f21db8-7f8c-4cc7-bc8b-4b5ec359f81b",
  "ABA REAL ESTATE": "d0f21db8-7f8c-4cc7-bc8b-4b5ec359f81b",
  
  // A.C.Holdings
  "A.C.HOLDINGS": "c1c9259d-0820-4ca9-a6f5-1d05e8bb3ec8",
  "AC HOLDINGS": "c1c9259d-0820-4ca9-a6f5-1d05e8bb3ec8",
  
  // Leos Development
  "LEOS DEVELOPMENT": "6a3ab632-04af-43b6-8347-d29a2ede114b",
  "LEOS": "6a3ab632-04af-43b6-8347-d29a2ede114b",
  
  // Taraf Properties
  "TARAF PROPERTIES": "7c3277b6-ff6a-44e1-ac31-11e1d5d48696",
  "TARAF PROPERTIES DMCC": "7c3277b6-ff6a-44e1-ac31-11e1d5d48696",
  
  // 1b Tower Co.
  "1B TOWER": "6f6f0c73-df4e-45b6-b1b3-bd6ef09f71cb",
  "1B TOWER CO. L.L.C": "6f6f0c73-df4e-45b6-b1b3-bd6ef09f71cb",
  
  // Note: Additional developers from API response
  // These will be dynamically loaded from the API, but we include common ones here
  // The fetchDevelopersMapping function will merge API data with this static mapping
  
  // A H S Palm Development
  "A H S PALM DEVELOPMENT": "4ca71fe0-bdf1-4c70-8741-014806bb561e",
  "AHS PALM": "4ca71fe0-bdf1-4c70-8741-014806bb561e",
  
  // Aa Real Estate Development
  "AA REAL ESTATE DEVELOPMENT": "81928a20-6acc-468a-abbc-8f997774a16b",
  "AA REAL ESTATE": "81928a20-6acc-468a-abbc-8f997774a16b",
  
  // Ab Properties
  "AB PROPERTIES": "b9117696-2da0-4088-b4ff-f63560123cd2",
  "AB PROPERTIES LIMITED": "b9117696-2da0-4088-b4ff-f63560123cd2",
  
  // Das Real Estate
  "DAS REAL ESTATE": "38fbf7df-0466-4f3d-8efd-f58c2759e768",
  "DAS": "38fbf7df-0466-4f3d-8efd-f58c2759e768",
  
  // Ginco Properties
  "GINCO PROPERTIES": "e8a56d20-1b1f-4a85-8098-b355f987b11c",
  "GINCO": "e8a56d20-1b1f-4a85-8098-b355f987b11c",
  
  // Qube Development
  "QUBE DEVELOPMENT": "ccdfb4f5-ec6b-4f46-b46e-a708386c84a7",
  "QUBE": "ccdfb4f5-ec6b-4f46-b46e-a708386c84a7",
  
  // Vincitore Real Estate Development
  "VINCITORE": "9e1c109d-0ae1-4682-bb0b-8870a77e9916",
  "VINCITORE REAL ESTATE": "9e1c109d-0ae1-4682-bb0b-8870a77e9916",
  
  // Additional common developer name variations
  "SOBHA": "8a69afa1-533a-4245-a126-efece8547d08", // Note: This ID may need to be updated from API
  "SOBHA REALTY": "8a69afa1-533a-4245-a126-efece8547d08",
  "SOBHA REALTY GROUP": "8a69afa1-533a-4245-a126-efece8547d08",
  
  "NAKHEEL": "5cca9f3e-4bc6-4545-88d0-6e575cd07e94", // Note: This ID may need to be updated from API
  "NAKHEEL PROPERTIES": "5cca9f3e-4bc6-4545-88d0-6e575cd07e94",
  "NAKHEEL GROUP": "5cca9f3e-4bc6-4545-88d0-6e575cd07e94",
  
  "MERAAS": "e5fce201-46b9-4066-9312-9d1a2d6b9592", // Note: This ID may need to be updated from API
  "MERAAS PROPERTIES": "e5fce201-46b9-4066-9312-9d1a2d6b9592",
  "MERAAS HOLDINGS": "e5fce201-46b9-4066-9312-9d1a2d6b9592",
};

/**
 * Get developer ID from developer name
 * @param developerName - The developer name (case-insensitive)
 * @returns The developer ID if found, null otherwise
 */
export function getDeveloperIdByName(developerName: string): string | null {
  if (!developerName) return null;
  
  const normalizedName = developerName.toUpperCase().trim();
  
  // Direct lookup
  if (DEVELOPER_NAME_TO_ID[normalizedName]) {
    return DEVELOPER_NAME_TO_ID[normalizedName];
  }
  
  // Try partial matching for common variations
  for (const [key, value] of Object.entries(DEVELOPER_NAME_TO_ID)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }
  
  return null;
}

/**
 * Fetch all developers from API and create a dynamic mapping
 * This allows us to get the latest developer IDs from the API
 */
export async function fetchDevelopersMapping(): Promise<Map<string, string>> {
  try {
    const response = await fetch('/api/developers?page=1&limit=100');
    if (!response.ok) {
      console.warn('Failed to fetch developers for mapping');
      return new Map(Object.entries(DEVELOPER_NAME_TO_ID));
    }
    
    const data = await response.json();
    if (!data.success || !data.data) {
      return new Map(Object.entries(DEVELOPER_NAME_TO_ID));
    }
    
    const mapping = new Map<string, string>();
    
    // Add static mappings first
    Object.entries(DEVELOPER_NAME_TO_ID).forEach(([name, id]) => {
      mapping.set(name, id);
    });
    
    // Add dynamic mappings from API
    data.data.forEach((dev: any) => {
      const companyName = dev.Company?.name || dev.name;
      if (companyName && dev.id) {
        const normalizedName = companyName.toUpperCase().trim();
        mapping.set(normalizedName, dev.id);
        
        // Also add variations
        if (normalizedName.includes('PROPERTIES')) {
          mapping.set(normalizedName.replace(' PROPERTIES', ''), dev.id);
        }
        if (normalizedName.includes('DEVELOPMENTS')) {
          mapping.set(normalizedName.replace(' DEVELOPMENTS', ''), dev.id);
        }
        if (normalizedName.includes('DEVELOPMENT')) {
          mapping.set(normalizedName.replace(' DEVELOPMENT', ''), dev.id);
        }
      }
    });
    
    return mapping;
  } catch (error) {
    console.error('Error fetching developers mapping:', error);
    return new Map(Object.entries(DEVELOPER_NAME_TO_ID));
  }
}
