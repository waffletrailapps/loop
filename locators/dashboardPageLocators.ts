export const DashboardPageLocators = {
    // Locate a specific column (e.g., "To Do", "In Progress"), ensuring it's within the board
    column: (columnName: string) =>
      `//h2[contains(@class, 'font-semibold') and normalize-space(text())='${columnName}']
      /ancestor::div[contains(@class, 'flex flex-col') and contains(@class, 'w-80')]`, // Ensure it's a column container
  
    // Locate a specific task within a column
    task: (taskName: string) => 
      `//h3[contains(@class, 'font-medium') and normalize-space(text())='${taskName}']`,
  
    // Locate the tag section inside a task
    taskTagSection: (taskName: string) => 
      `//h3[contains(@class, 'font-medium') and normalize-space(text())='${taskName}']
      /following-sibling::div[contains(@class, 'flex-wrap')]`,
  
    // Locate a specific tag inside a task
    taskTag: (taskName: string, tagName: string) => 
      `//h3[contains(@class, 'font-medium') and normalize-space(text())='${taskName}']
      /following-sibling::div[contains(@class, 'flex-wrap')]//span[normalize-space(text())='${tagName}']`,
  };
  