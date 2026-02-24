/**
 * Shopify Storefront API Utility
 * Implementation for JJ WEAR
 */

// Replace these with actual credentials from the user
const shopifyDomain = 'YOUR_SHOP_DOMAIN.myshopify.com';
const storefrontAccessToken = 'YOUR_STOREFRONT_ACCESS_TOKEN';

const query = `
{
  products(first: 20) {
    edges {
      node {
        id
        title
        description
        vendor
        collections(first: 1) {
          edges {
            node {
              title
            }
          }
        }
        images(first: 2) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`;

export const fetchShopifyProducts = async () => {
  if (shopifyDomain.includes('YOUR_SHOP_DOMAIN')) {
    console.warn('Shopify domain not configured.');
    return null;
  }

  try {
    const response = await fetch(`https://${shopifyDomain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    
    return result.data.products.edges.map(({ node }) => ({
      id: node.id,
      name: node.title,
      price: parseFloat(node.variants.edges[0].node.priceV2.amount),
      currency: node.variants.edges[0].node.priceV2.currencyCode,
      image: node.images.edges[0]?.node.url || '',
      backImage: node.images.edges[1]?.node.url || null,
      description: node.description,
      collection: node.collections.edges[0]?.node.title || 'General',
      shopifyUrl: `https://${shopifyDomain}/products/${node.handle}`
    }));
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return null;
  }
};

export const createShopifyCheckout = async (items) => {
  // Logic to create a checkout and get the webUrl
  // For a basic setup, we can also link directly to the cart
  const checkoutItems = items.map(item => ({
    variantId: item.shopifyVariantId, // We'll need to store this in ProductContext
    quantity: item.quantity
  }));
  
  // Return the checkout URL from Shopify
};
