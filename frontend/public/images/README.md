# Adding Volleyball Images

To add your volleyball images to the project:

1. Place your images in this folder with the following names:
   - `Mo_Volley1.jpg` (or .png)
   - `Mo_Volley2.jpg` (or .png) 
   - `Mo_Volley3.jpg` (or .png)

2. Once you add the images, update the App.js file to replace the placeholder divs with actual image tags.

3. The images will automatically display in the 10th slide of the presentation.

## Image Requirements:
- Recommended size: 400x300 pixels or similar aspect ratio
- Format: JPG, PNG, or WebP
- File size: Keep under 1MB each for fast loading

## Example Usage:
```jsx
<img 
  src="/images/Mo_Volley1.jpg" 
  alt="Beach Volleyball Action" 
  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
/>
``` 