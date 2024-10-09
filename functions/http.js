export async function http_query(query, params) {
    ;
 
     try {
         const response = await fetch(query);
 
         if (!response.ok) {
             const errorBody = await response.text();
             console.error('Error response:', errorBody);
             throw new Error(`Network response was not ok: ${response.status}`);
         }
         const data = await response.json();
         return data;
     } catch (error) {
         console.error('Error inserting or replacing classification:', error);
     }
 
 }