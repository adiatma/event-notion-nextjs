import { APIErrorCode, Client } from "@notionhq/client";

// @see https://github.com/makenotion/notion-sdk-js#usage
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * @see https://developers.notion.com/reference/database
 * @param {String} databaseId
 * @return {Promise<Array>}
 */
export const getDatabase = async (databaseId) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      // For example: handle by asking the user to select a different database
    } else {
      return error.body;
    }
  }
};

/**
 * @see https://developers.notion.com/reference/retrieve-a-page
 * @param {String} pageId
 * @return {Promise<Object>}
 */
export const getPage = async (pageId) => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      // For example: handle by asking the user to select a different database
    } else {
      return error.body;
    }
  }
};

/**
 * @see https://developers.notion.com/reference/get-block-children
 * @param {String} blockId
 * @return {Promise<Array>}
 */
export const getBlock = async (blockId, pageSize) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: pageSize,
    });
    return response;
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      // For example: handle by asking the user to select a different database
    } else {
      return error.body;
    }
  }
};
