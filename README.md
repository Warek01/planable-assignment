# Planable assignment

## Description

A simple media gallery able to store and manage media items such as images, videos and GIFs in a folder hierarchy in the
browser.

## Demo
![Video](./docs/demo.mp4)

## Current features

- Top level folders
- Folder creation
- Add mocked media
- Folder navigation
- File management (creation, deletion, renaming, movement via DnD and select, multiple selection)
- Filtering by type and name
- Thumbnails for media and a simple popup player
- Store media in local storage

## Stack

- React 18 on react-router 7 and typescript 5
- TailwindCSS
- Redux with react-redux and toolkit
- DnD kit
- Radix UI

## How to run

1. Build the app using `pnpm run build`
1. Run the app using `pnpm run start`
1. Go to http://localhost:3000

## Architecture

The application was built for skill demonstration purposes, so the architecture lacks a couple on components that I
would do for a real app, I will list those later.
There is a top level root file, in which are the main providers, side-effect imports and other important initializers
for the runtime. Files are organized in feature
folders, in my case I have only one feature - media, and the generic files are in top level folders such as components,
utils, types etc. I use 2 redux slices for state management,
one for the actual data (that should be synchronized with a REST API, but is mocked with localStorage) and one for UI
state such as data about the selected folder, item selection,
filtering, etc. I tried to reuse as much logic as I could by defining generic FolderList, FolderHero components. I use a
portal to the body to display the media player using a backdrop
UI pattern.

**Data model** \
Folders and items are loaded from localStorage and appended to global state (or mock data, if localStorage is empty).
Folders and items are accessed via selectors.
Folders keep item IDs for hierarchy. To fetch item data from a folder, a memorized reducer is used that basically
filters out based on ID. Rename, move, create and other
logic is located in the reducers, they are relatively simple. After update the state is saved in localStorage.

Folder route is responsible for syncing state with the current route, this simple solution is good enough for a small scale app. In a larger app, a separate context
would be a better approach as more logic would be required upon navigation.
```ts   
useEffect(() => {
  // Sync selected folder with store
  dispatch(setActiveFolder({ folderId: folder?.id }));
  dispatch(clearItemSelection());

  return () => {
     dispatch(setActiveFolder({ folderId: undefined }));
     dispatch(clearItemSelection());
  };
}, [folderId, allFolders]);
   ```

## Limitations
- Only top level folders exist
- The slug in the url for folder is ugly (its UUID)
- No API middleware used, I directly in the reducer sync with localStorage (this violates the pure-function philosophy of redux, in prod it would be fixed by using thunks instead of reducers with no side-effects)
- Media player is too simple, only plays a mock video for videos and GIFs.
- Images are not preloaded nor lazy-loaded upon entering the viewport.
- Persistent data is only in localStorage.
- No SSR.
- All items are kept in memory, but only the ones in current folder should be.
- Not mobile-friendly.

## Strong points
- Conventional commits.
- Strong typization.
- Global state management.
- Memorization using reselect, memo HOC, useMemo hooks.
- Intuitive folder structure.
- Debounce for search.

## How I would make it for production
- Introduce API with all the file/folder logic in it instead of client. This would also solve the somewhat complex reducers.
- Use NextJS for SSR, as the nature of app is suitable.
- Introduce lazy load in media grid and infinite scroll.
- Introduce SEO optimizations, like meta tags and a nice URL slug based on folder hierarchy (/folder1-name/folder2-name/... instead of /folderId)
- Filtering should also be done on server side
- Use a blob storage in the cloud for media, ideally sharded based on user region.
- Make a nested hierarchy, where folders can have other folders. For this I would introduce an Inode interface that generalizes files and folders.
- Use aggressive caching on server side.
- Load only current folder files upon navigation, this would be easy by syncing state with API calls using redux API or react-query, the cache is easily managed 
by using folder IDs as keys.
- Use as many layers of error checking as possible.
- Introduce unit testing and dockerization.
- Do more fine-grained conventional commits, as some of my commits are bulky and touch more than one functionality at a time.
- Add linting.
- Modify the mock file creator with an actual file upload, determine its media type based on MIME type.
- Add loading states for components.
- Add fancy UI elements for errors.
