# Templates Guide

Use these templates when you want to create a new post or walkthrough.

## Where to store images
- Keep image files in `posts/images/`.
- When you copy a template into the `posts/` folder, reference images like this:
  - `images/example-image.png`

## How to use
1. Copy `templates/post-template.html` to `posts/new-post.html`.
2. Copy `templates/walkthrough-template.html` to `posts/new-walkthrough.html`.
3. Replace the placeholder text and headings.
4. If you need images, add them to `posts/images/`.
5. Update the `src` value in the optional image block.

## Optional image block
In the templates there is a commented image section you can use:
```html
<figure class="post-image">
    <img src="images/example-image.png" alt="Short description of the image">
    <figcaption>Figure 1: Caption describing the image.</figcaption>
</figure>
```

## Notes
- The templates already include site navigation and footer structure.
- Keep the paths as shown when the file lives in `posts/`.
