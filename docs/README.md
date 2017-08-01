## Shelfaux
The personal library visualization site

### Description
People are increasingly moving to digital books, however what we keep on our bookshelves says a lot about who we are and have been a longstanding aesthetic piece in many rooms. Shelffaux introduces a way to visually recreate the home library in poster form or for interactive digital display.

There are several library and book review and management sites, GoodReads being a primary example, however none of the available sites offer a visually appealing way to display your books, and they are no replacement for the interest that a bookshelf holds.

### MVP  

Shelffaux will

- [ ] Visually recreate an interactive bookshelf
- [ ] Browse through books on the shelf the same way one would physically.
 Books are displayed by spine, not front cover, and as a user browses over
  them (mousing over, or swiping on touch screen) books are animated to allow
   the user to peak at the front and back covers.
- [ ] Sorting Algorithms to display books in different orders

### Wireframes

![wireframes](Shelffaux_animation.png)
![wireframes](shlefaux.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript & HTML canvas

### Timeline

**Day 1**: Setup basic structure including base html and script skeletons
  - bookshelf.js : manage book objects & call draw on loaded
  - book.js : represent book object - has default size and display properties that are modified as by how bookshelf calls it
  - util : responsible for sorting algorithms and comparator callbacks
  - index.html : calls script and has canvas tag that bookshelf will be rendered into
**Day 2**: build book object & bookshelf that arranges books in default order
  - bookshelf will be able to call and display blank book objects
**Day 3**: finish responsive design & start sorting
  - books will be able to move and respond to the mouse
**Day 4**: complete sorting and polish css
  - bookshelf will be able to call sort on books & display in different orders
  - page css will be polished and all links will work 


### Bonus features

- [ ] Use Amazon and/or GoodReads Api to pull Cover Photo's
- [ ] Add User interface for others to make their own shelves
- [ ] Auto pull a user's GoodReads or Amazon bookshelves
