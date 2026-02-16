// Developer name to ID mapping for Alnair API
// Alnair uses numeric IDs for developers (e.g., builders[0]=55 for Emaar)

export interface DeveloperInfo {
  id: number;
  name: string;
  logo?: string;
}

// Static list of developers with their Alnair IDs and logos
export const DEVELOPERS: DeveloperInfo[] = [
  { id: 6, name: 'Emaar Properties', logo: 'https://files.alnair.ae/uploads/2023/3/59/74/5974dd50e1f85b5a56cdcef99f37eafe.png' },
  { id: 442, name: 'Nakheel', logo: 'https://files.alnair.ae/uploads/2023/3/f5/40/f5409ee3abc4bcc64c98cfc1b932d3ec.png' },
  { id: 89, name: 'Meraas', logo: 'https://files.alnair.ae/uploads/2023/5/49/1f/491ffef96076d62638f9e82b1e949f8e.png' },
  { id: 988, name: 'Dubai Properties', logo: 'https://files.alnair.ae/uploads/2024/8/d6/c5/d6c501cf1655e7d80827b93b7b531c80.jpg' },
  { id: 64, name: 'Damac', logo: 'https://files.alnair.ae/uploads/2023/2/87/11/8711de4977ea543b20637d56aae008a7.jpg' },
  { id: 75, name: 'Binghatti', logo: 'https://files.alnair.ae/uploads/2023/2/b1/72/b172d12abf1764c980bb6d386799d771.jpg' },
  { id: 55, name: 'Azizi', logo: 'https://files.alnair.ae/uploads/2023/2/61/96/61960833617390084dcf04c2b55fa878.jpg' },
  { id: 490, name: 'ARADA', logo: 'https://files.alnair.ae/uploads/2025/10/cc/6e/cc6e912a3da38df2e6c746f38768153b.jpg' },
  { id: 424, name: 'Imtiaz', logo: 'https://files.alnair.ae/uploads/2024/12/a3/07/a30749705ecf32ffdb546fe98a80faf3.png' },
  { id: 1035, name: 'Beyond', logo: 'https://files.alnair.ae/uploads/2024/9/b0/b3/b0b3c46a78ca420114fed58d13d8217b.jpg' },
  { id: 69, name: 'Ellington', logo: 'https://files.alnair.ae/uploads/2023/2/b4/14/b414f7493c40d8038fcc7faec37a6398.jpg' },
  { id: 335, name: 'Sobha', logo: 'https://files.alnair.ae/uploads/2025/10/99/ad/99adee3628045b1b38e8144c607d84a4.png' },
  { id: 510, name: 'Aldar', logo: 'https://files.alnair.ae/uploads/2023/6/38/fc/38fc0307791bfa0a62864637d5c10652.jpg' },
  { id: 68, name: 'Danube', logo: 'https://files.alnair.ae/uploads/2023/3/ce/cf/cecfd137a1c39320cc6947dac2f6a78a.jpg' },
  { id: 67, name: 'Omniyat', logo: 'https://files.alnair.ae/uploads/2023/3/e0/60/e060e6319b12c80ac776c94e4a108faf.jpg' },
  { id: 380, name: 'Dubai South', logo: 'https://files.alnair.ae/uploads/2023/7/f7/a7/f7a7b92779698a1507a61749738f3327.png' },
  { id: 473, name: 'Expo City', logo: 'https://files.alnair.ae/uploads/2023/4/df/69/df69de6ea48d4f5f1ec8ed07a87780cf.png' },
  { id: 479, name: 'The Heart of Europe', logo: 'https://files.alnair.ae/uploads/2023/4/40/2c/402cf9d3c2bee9d131e47479ed967e80.png' },
  { id: 520, name: 'H&H Development', logo: 'https://files.alnair.ae/uploads/2023/6/f3/db/f3dbff1b9db7d38e60531480827cefe8.jpg' },
  { id: 266, name: 'SRG', logo: 'https://files.alnair.ae/uploads/2023/6/78/29/7829eb7a9ff88b3159eb3e9420b19d90.png' },
  { id: 542, name: 'Reportage', logo: 'https://files.alnair.ae/uploads/2023/7/44/6d/446d60773aa54928d125e8efae91907a.jpg' },
  { id: 441, name: 'Select Group', logo: 'https://files.alnair.ae/uploads/2023/3/2b/4c/2b4c5aa94d1ed171f17052565acc4d51.jpg' },
  { id: 536, name: 'Majid Al Futtaim', logo: 'https://files.alnair.ae/uploads/2023/7/48/14/4814b4710991b787eb1134553e1571f6.jpg' },
  { id: 439, name: 'Object One', logo: 'https://files.alnair.ae/uploads/2023/5/9d/d7/9dd70a933c457c0cfa7c646ec299f1c1.jpg' },
  { id: 961, name: 'Dugasta Properties Development', logo: 'https://files.alnair.ae/uploads/2024/8/d8/3e/d83e2fade14a6be17b4787c3742d39a9.png' },
  { id: 474, name: 'Leos Development', logo: 'https://files.alnair.ae/uploads/2025/4/56/58/5658ab7d3aea0e009ac7d3e765c2826f.png' },
  { id: 823, name: 'BnW Developments', logo: 'https://files.alnair.ae/uploads/2024/6/89/ec/89ec0455df07d71774e54863246bef8d.jpg' },
  { id: 1030, name: 'Anax Developments', logo: 'https://files.alnair.ae/uploads/2024/9/63/47/63478d408ed92a294011d32c0b841ef7.jpg' },
  { id: 508, name: 'AYS Property Development', logo: 'https://files.alnair.ae/uploads/2025/11/70/cb/70cb384da09b037c184630c42d82b340.png' },
  { id: 524, name: 'Nabni', logo: 'https://files.alnair.ae/uploads/user_logo/2024/10/d4/9b/d49becd1f1e29f5462be90165141cfc8.png' },
  { id: 256, name: 'Union Properties', logo: 'https://files.alnair.ae/uploads/user_logo/2024/8/5f/15/5f15404a2d6556af825442f39faa2805.jpg' },
  { id: 1034, name: 'HRE Development', logo: 'https://files.alnair.ae/uploads/user_logo/2025/2/7e/28/7e289756cd4dee4b371e21d1a086a661.png' },
];

// Developer name to ID mapping for quick lookup
const DEVELOPER_NAME_TO_ID: Map<string, number> = new Map();

// Initialize the mapping
DEVELOPERS.forEach(dev => {
  const normalizedName = dev.name.toUpperCase().trim();
  DEVELOPER_NAME_TO_ID.set(normalizedName, dev.id);
  
  // Add variations without common suffixes
  const suffixes = [' PROPERTIES', ' DEVELOPMENTS', ' DEVELOPMENT', ' REALTY', ' GROUP', ' DEVELOPERS', ' HOLDING', ' HOLDINGS', ' L.L.C', ' LLC'];
  let simplifiedName = normalizedName;
  suffixes.forEach(suffix => {
    if (simplifiedName.endsWith(suffix)) {
      simplifiedName = simplifiedName.replace(suffix, '').trim();
      if (simplifiedName) {
        DEVELOPER_NAME_TO_ID.set(simplifiedName, dev.id);
      }
    }
  });
});

/**
 * Get all developers (for display in UI)
 */
export function getAllDevelopers(): DeveloperInfo[] {
  return [...DEVELOPERS].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get developer ID from developer name
 * @param developerName - The developer name (case-insensitive)
 * @returns The developer ID if found, null otherwise
 */
export function getDeveloperIdByName(developerName: string): string | null {
  if (!developerName) return null;
  
  const normalizedName = developerName.toUpperCase().trim();
  
  // Direct lookup
  if (DEVELOPER_NAME_TO_ID.has(normalizedName)) {
    return DEVELOPER_NAME_TO_ID.get(normalizedName)!.toString();
  }
  
  // Try partial matching
  for (const [key, value] of DEVELOPER_NAME_TO_ID.entries()) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value.toString();
    }
  }
  
  return null;
}

/**
 * Get developer ID by name (async version for compatibility)
 */
export async function getDeveloperIdByNameAsync(developerName: string): Promise<string | null> {
  return getDeveloperIdByName(developerName);
}

/**
 * Get developer by ID
 */
export function getDeveloperById(id: number): DeveloperInfo | undefined {
  return DEVELOPERS.find(dev => dev.id === id);
}

/**
 * Fetch developers mapping (for compatibility - now returns static data)
 */
export async function fetchDevelopersMapping(): Promise<Map<string, string>> {
  const mapping = new Map<string, string>();
  DEVELOPER_NAME_TO_ID.forEach((id, name) => {
    mapping.set(name, id.toString());
  });
  return mapping;
}
