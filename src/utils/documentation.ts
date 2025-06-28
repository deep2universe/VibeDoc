export const loadMarkdownContent = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    
    // Check if content appears to be HTML instead of Markdown
    if (content.trim().startsWith('<!DOCTYPE html') || content.trim().startsWith('<html')) {
      throw new Error(`Content at ${path} appears to be HTML, not Markdown`);
    }
    
    return content;
  } catch (error) {
    console.error('Error loading markdown content:', error);
    throw error;
  }
};