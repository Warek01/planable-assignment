import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate, generatePath, NavLink } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useMemo, memo, useRef, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector, useStore, Provider } from "react-redux";
import { Theme, Box, Flex, TextField, Button, Text, Spinner, Grid, Checkbox, Select, Dialog, Heading, Avatar, Tooltip } from "@radix-ui/themes";
import { createAsyncThunk, createSlice, createSelector, configureStore } from "@reduxjs/toolkit";
import * as uuid from "uuid";
import { DndContext, pointerWithin, useDraggable, useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import { Cross1Icon, LinkBreak1Icon, MagnifyingGlassIcon, FilePlusIcon, WidthIcon, HeightIcon, Pencil1Icon, StarIcon, TrashIcon } from "@radix-ui/react-icons";
import { useDebouncedCallback } from "use-debounce";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary2) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary2, props);
  };
}
const mockFolders = [
  {
    name: "folder-1",
    id: "afd5aa31-75e6-4225-afa4-76aff33753f8",
    itemIds: [
      "7b577a7d-a708-4628-8ee4-0fb5b5d0f3d6",
      "0388dd3d-1d76-40f3-8fbe-5de1c3dca13c",
      "463821e4-ccb4-4619-a3fb-fd598b45816b",
      "463821e4-ccb4-4619-a3fb-fd598b45716b",
      "463821e4-ccb4-4619-a3fb-ad598b45816b",
      "463821e4-ccb4-3219-a3fb-fd598b45716b",
      "463821e4-ccb4-4615-a3fb-fd598b45716b",
      "563821e4-ccb4-4615-a3fb-fd598b45716b",
      "663821e4-ccb4-4615-a3fb-fd598b45716b",
      "563821e4-ccb4-4615-a3fb-fd59bgb45716b",
      "563821e4-ccb4-4615-a3fa-fd59bgb45716b"
    ]
  },
  {
    name: "folder-2",
    id: "4ac8ca09-e9c4-4baf-94f2-855bf78911d6",
    itemIds: [
      "43b33bdb-37e0-4846-a54f-511eb23e1d36",
      "acb33bdb-37e0-4846-a54f-511eb23e1d36"
    ]
  },
  {
    name: "folder-3",
    id: "e3e4ec5e-a85a-4eb3-831f-253427799a90",
    itemIds: ["4c18510e-378e-4dc2-b30e-9e70f1409355"]
  }
];
var MediaItemType = /* @__PURE__ */ ((MediaItemType2) => {
  MediaItemType2["IMAGE"] = "img";
  MediaItemType2["GIF"] = "gif";
  MediaItemType2["VIDEO"] = "vid";
  return MediaItemType2;
})(MediaItemType || {});
const mockItems = [
  {
    name: "img1.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/1/2000/3000",
    thumbnailUrl: "https://picsum.photos/id/1/200/300",
    id: "7b577a7d-a708-4628-8ee4-0fb5b5d0f3d6"
  },
  {
    name: "img2.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/2/2000/3000",
    thumbnailUrl: "https://picsum.photos/id/2/200/300",
    id: "0388dd3d-1d76-40f3-8fbe-5de1c3dca13c"
  },
  {
    name: "img3.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/3/5000/2000",
    thumbnailUrl: "https://picsum.photos/id/3/500/200",
    id: "463821e4-ccb4-4619-a3fb-fd598b45816b"
  },
  {
    name: "img4.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/6/300/3000",
    thumbnailUrl: "https://picsum.photos/id/6/300/3000",
    id: "463821e4-ccb4-4619-a3fb-fd598b45716b"
  },
  {
    name: "img5.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/12/1000/1000",
    thumbnailUrl: "https://picsum.photos/id/12/1000/1000",
    id: "463821e4-ccb4-3219-a3fb-fd598b45716b"
  },
  {
    name: "test.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/6/3000/3000",
    thumbnailUrl: "https://picsum.photos/id/6/300/300",
    id: "463821e4-ccb4-4615-a3fb-fd598b45716b"
  },
  {
    name: "test.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/13/5000/5000",
    thumbnailUrl: "https://picsum.photos/id/13/500/500",
    id: "563821e4-ccb4-4615-a3fb-fd598b45716b"
  },
  {
    name: "video.mp4",
    type: MediaItemType.VIDEO,
    url: "https://picsum.photos/id/14/5000/5000",
    thumbnailUrl: "https://picsum.photos/id/14/500/500",
    id: "563821e4-ccb4-4615-a3fb-fd59bgb45716b"
  },
  {
    name: "test gif.gif",
    type: MediaItemType.GIF,
    url: "https://picsum.photos/id/19/300/350",
    thumbnailUrl: "https://picsum.photos/id/19/300/350",
    id: "563821e4-ccb4-4615-a3fa-fd59bgb45716b"
  },
  {
    name: "test.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/14/1000/3000",
    thumbnailUrl: "https://picsum.photos/id/14/100/300",
    id: "663821e4-ccb4-4615-a3fb-fd598b45716b"
  },
  {
    name: "img3.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/10/2000/4000",
    thumbnailUrl: "https://picsum.photos/id/10/200/400",
    id: "463821e4-ccb4-4619-a3fb-ad598b45816b"
  },
  {
    name: "img1.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/4/2000/3000",
    thumbnailUrl: "https://picsum.photos/id/4/200/300",
    id: "43b33bdb-37e0-4846-a54f-511eb23e1d36"
  },
  {
    name: "vid.mp4",
    type: MediaItemType.VIDEO,
    url: "https://picsum.photos/id/20/10000/3000",
    thumbnailUrl: "https://picsum.photos/id/20/1000/300",
    id: "acb33bdb-37e0-4846-a54f-511eb23e1d36"
  },
  {
    name: "img21.jpg",
    type: MediaItemType.IMAGE,
    url: "https://picsum.photos/id/5/2000/3000",
    thumbnailUrl: "https://picsum.photos/id/5/200/300",
    id: "4c18510e-378e-4dc2-b30e-9e70f1409355"
  }
];
const ITEMS_KEY = "media-items";
const FOLDERS_KEY = "media-folders";
const setFolders = (folders) => localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
const setItems = (items) => localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
const fetchFolders = createAsyncThunk("media/fetch-folders", () => {
  let foldersStr = localStorage.getItem(FOLDERS_KEY);
  if (!foldersStr) {
    setFolders(mockFolders);
    return mockFolders;
  }
  return JSON.parse(foldersStr);
});
const fetchItems = createAsyncThunk("media/fetch-items", () => {
  let itemsStr = localStorage.getItem(ITEMS_KEY);
  if (!itemsStr) {
    setItems(mockItems);
    return mockItems;
  }
  return JSON.parse(itemsStr);
});
const initialState$1 = {
  folders: [],
  items: []
};
const MEDIA_DATA_SLICE_NAME = "media-data";
const mediaDataSlice = createSlice({
  initialState: initialState$1,
  name: MEDIA_DATA_SLICE_NAME,
  reducers: {
    addItems(state, action) {
      const { items, folderId } = action.payload;
      state.folders = state.folders.map(
        (folder2) => folder2.id === folderId ? {
          ...folder2,
          itemIds: folder2.itemIds.concat(items.map((i) => i.id))
        } : folder2
      );
      state.items = state.items.concat(items);
      setFolders(state.folders);
      setItems(state.items);
    },
    deleteItems(state, action) {
      const { folderId, itemIds } = action.payload;
      state.folders = state.folders.map(
        (folder2) => folder2.id === folderId ? {
          ...folder2,
          itemIds: folder2.itemIds.filter(
            (id) => !itemIds.includes(id)
          )
        } : folder2
      );
      state.items = state.items.filter(
        (stateItem) => !itemIds.includes(stateItem.id)
      );
      setFolders(state.folders);
      setItems(state.items);
    },
    moveItems(state, action) {
      const { itemIds, dstFolderId, srcFolderId } = action.payload;
      state.folders = state.folders.map((folder2) => {
        if (folder2.id === srcFolderId) {
          return {
            ...folder2,
            itemIds: folder2.itemIds.filter((id) => !itemIds.includes(id))
          };
        }
        if (folder2.id === dstFolderId) {
          return {
            ...folder2,
            itemIds: folder2.itemIds.concat(itemIds)
          };
        }
        return folder2;
      });
      setFolders(state.folders);
    },
    renameItem(state, action) {
      const { newName, itemId } = action.payload;
      state.items = state.items.map(
        (stateItem) => stateItem.id === itemId ? {
          ...stateItem,
          name: newName
        } : stateItem
      );
      setItems(state.items);
    },
    createFolder(state, action) {
      const { folderName } = action.payload;
      if (state.folders.find((f) => f.name === folderName)) {
        return;
      }
      state.folders = state.folders.concat({
        name: folderName,
        itemIds: [],
        id: uuid.v4()
      });
      setFolders(state.folders);
    },
    deleteFolder(state, action) {
      const { folderName } = action.payload;
      state.folders = state.folders.filter(
        (folder2) => folder2.name !== folderName
      );
      setFolders(state.folders);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      state.folders = action.payload;
    }).addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});
const mediaDataReducer = mediaDataSlice.reducer;
const {
  deleteItems,
  renameItem,
  addItems,
  moveItems,
  createFolder,
  deleteFolder
} = mediaDataSlice.actions;
const selectFolders = (state) => state.mediaData.folders;
const selectItems = (state) => state.mediaData.items;
const selectFolder = createSelector(
  [selectFolders, (state, folderId) => folderId],
  (folders, folderId) => folders.find((stateFolder) => stateFolder.id === folderId)
);
createSelector(
  [selectItems, (state, itemId) => itemId],
  (items, itemId) => items.find((stateItem) => stateItem.id === itemId)
);
const selectAllFolderNames = createSelector(
  [selectFolders],
  (folders) => folders.map((f) => f.name)
);
const allMediaTypes = [
  MediaItemType.IMAGE,
  MediaItemType.VIDEO,
  MediaItemType.GIF
];
const initialState = {
  selectedItemIds: [],
  selectedFolderId: void 0,
  activeFilters: [MediaItemType.IMAGE, MediaItemType.VIDEO, MediaItemType.GIF],
  searchString: void 0
};
const MEDIA_UI_STATE_SLICE_NAME = "media-ui-state";
const mediaUiStateSlice = createSlice({
  initialState,
  name: MEDIA_UI_STATE_SLICE_NAME,
  reducers: {
    setActiveFolder(state, action) {
      const { folderId } = action.payload;
      state.selectedFolderId = folderId;
    },
    addFilter(state, action) {
      const { filter } = action.payload;
      if (state.activeFilters.includes(filter)) {
        return;
      }
      state.activeFilters = state.activeFilters.concat(filter);
    },
    clearFilters(state) {
      state.activeFilters = [];
    },
    fillFilters(state) {
      state.activeFilters = allMediaTypes.concat();
    },
    addItemToSelection(state, action) {
      const { itemId } = action.payload;
      if (state.selectedItemIds.includes(itemId)) {
        return;
      }
      state.selectedItemIds = state.selectedItemIds.concat(itemId);
    },
    setItemSelection(state, action) {
      const { itemIds } = action.payload;
      state.selectedItemIds = itemIds;
    },
    removeItemFromSelection(state, action) {
      const { itemId } = action.payload;
      state.selectedItemIds = state.selectedItemIds.filter(
        (stateItemId) => stateItemId !== itemId
      );
    },
    clearItemSelection(state) {
      state.selectedItemIds = [];
    },
    removeFilter(state, action) {
      const { filter } = action.payload;
      state.activeFilters = state.activeFilters.filter((f) => f !== filter);
    },
    setSearchString(state, action) {
      const { searchString } = action.payload;
      state.searchString = searchString;
    }
  }
});
const mediaUiStateReducer = mediaUiStateSlice.reducer;
const {
  fillFilters,
  clearFilters,
  setActiveFolder,
  removeItemFromSelection,
  clearItemSelection,
  addItemToSelection,
  setItemSelection,
  removeFilter,
  addFilter,
  setSearchString
} = mediaUiStateSlice.actions;
const selectSearchString = (state) => state.mediaUiState.searchString;
const selectSelectedItemIds = (state) => state.mediaUiState.selectedItemIds;
const selectSelectedFolderId = (state) => state.mediaUiState.selectedFolderId;
const selectSelectedFolder = createSelector(
  [selectFolders, selectSelectedFolderId],
  (folders, selectedFolderId) => folders.find((folder2) => folder2.id === selectedFolderId)
);
const selectActiveFilters = (state) => state.mediaUiState.activeFilters;
const store = configureStore({
  reducer: {
    mediaData: mediaDataReducer,
    mediaUiState: mediaUiStateReducer
  }
});
const toastConfig = {
  position: "top-center"
};
const themeConfig = {
  radius: "large",
  appearance: "light"
};
const useAppDispatch = useDispatch.withTypes();
const useAppSelector = useSelector.withTypes();
useStore.withTypes();
const FileDnDHandler = ({ children }) => {
  const dispatch = useAppDispatch();
  const selectedFolder = useAppSelector(selectSelectedFolder);
  const resetScrollbars = () => {
    document.querySelectorAll(".hide-overflow-on-dnd").forEach((el) => el.classList.remove("dnd-overflow-hidden"));
  };
  const hideScrollbars = () => {
    document.querySelectorAll(".hide-overflow-on-dnd").forEach((el) => el.classList.add("dnd-overflow-hidden"));
  };
  const handleDragEnd = (event) => {
    var _a;
    resetScrollbars();
    const itemId = event.active.id.toString();
    const dstFolderId = (_a = event.over) == null ? void 0 : _a.id.toString();
    if (!itemId || !dstFolderId || !selectedFolder || dstFolderId === selectedFolder.id) {
      return;
    }
    dispatch(
      moveItems({
        itemIds: [itemId],
        srcFolderId: selectedFolder.id,
        dstFolderId
      })
    );
    dispatch(removeItemFromSelection({ itemId }));
  };
  const handleDragStart = () => {
    hideScrollbars();
  };
  const handleDragAbort = () => {
    resetScrollbars();
  };
  const handleDragCancel = () => {
    resetScrollbars();
  };
  return /* @__PURE__ */ jsx(
    DndContext,
    {
      collisionDetection: pointerWithin,
      onDragEnd: handleDragEnd,
      onDragStart: handleDragStart,
      onDragAbort: handleDragAbort,
      onDragCancel: handleDragCancel,
      children
    }
  );
};
const links = () => [{
  rel: "icon",
  href: "/icon.png"
}, {
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
const meta = () => [{
  title: "Media gallery"
}, {
  name: "description",
  content: "Simple media gallery that allows media files management"
}];
const Layout = ({
  children
}) => {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Theme, {
    ...themeConfig,
    children: [/* @__PURE__ */ jsx(Toaster, {
      ...toastConfig
    }), /* @__PURE__ */ jsx(Provider, {
      store,
      children: /* @__PURE__ */ jsx(FileDnDHandler, {
        children: /* @__PURE__ */ jsx(Outlet, {})
      })
    })]
  });
};
const root = withComponentProps(App);
const ErrorBoundary = withErrorBoundaryProps(({
  error
}) => {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  meta
}, Symbol.toStringTag, { value: "Module" }));
var AppRoute = /* @__PURE__ */ ((AppRoute2) => {
  AppRoute2["HOME"] = "/";
  AppRoute2["FOLDER"] = "/:folderId";
  return AppRoute2;
})(AppRoute || {});
const cn = (...classes) => twMerge(clsx(classes));
const CreateFolderInput = () => {
  const dispatch = useAppDispatch();
  const allFolderNames = useAppSelector(selectAllFolderNames);
  const [newFolderName, setNewFolderName] = useState("");
  const isValid = !!newFolderName.trim();
  const folderExists = allFolderNames.includes(newFolderName);
  const handleSubmit = () => {
    if (folderExists || !isValid) {
      return;
    }
    dispatch(createFolder({ folderName: newFolderName.trim() }));
    setNewFolderName("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handleChange = (event) => {
    setNewFolderName(event.target.value);
  };
  return /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "1", children: [
      /* @__PURE__ */ jsx(
        TextField.Root,
        {
          onKeyDown: handleKeyDown,
          placeholder: "Folder name",
          value: newFolderName,
          onChange: handleChange
        }
      ),
      /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, disabled: folderExists, children: "Create" })
    ] }),
    /* @__PURE__ */ jsxs(
      Text,
      {
        size: "1",
        color: "red",
        className: cn(
          "block text-ellipsis whitespace-nowrap overflow-hidden",
          { "opacity-0": !folderExists || !isValid }
        ),
        children: [
          newFolderName,
          " already exists"
        ]
      }
    )
  ] });
};
const Chevron = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.55806 5.55806C7.80214 5.31398 8.19786 5.31398 8.44194 5.55806L11.9419 9.05806C12.186 9.30214 12.186 9.69786 11.9419 9.94194C11.6979 10.186 11.3021 10.186 11.0581 9.94194L8 6.88388L4.94194 9.94194C4.69786 10.186 4.30214 10.186 4.05806 9.94194C3.81398 9.69786 3.81398 9.30214 4.05806 9.05806L7.55806 5.55806Z",
        fill: "#9FA4AB"
      }
    )
  }
);
const Folder = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M3.5 3.125C2.74061 3.125 2.125 3.74061 2.125 4.5V12C2.125 12.2624 2.24047 12.4978 2.42336 12.6581L3.10497 8.56845C3.31593 7.30271 4.41105 6.375 5.69425 6.375H11.8694C11.8062 5.67419 11.2173 5.125 10.5 5.125H8.11803C7.50253 5.125 6.93985 4.77725 6.66459 4.22672L6.21738 3.33229C6.15385 3.20525 6.02401 3.125 5.88197 3.125H3.5ZM13.1221 6.37512C13.0569 4.98336 11.9079 3.875 10.5 3.875H8.11803C7.97599 3.875 7.84615 3.79475 7.78262 3.66771L7.33541 2.77328C7.06015 2.22275 6.49747 1.875 5.88197 1.875H3.5C2.05025 1.875 0.875 3.05025 0.875 4.5V12C0.875 13.1736 1.82639 14.125 3 14.125H11.7842C13.0798 14.125 14.1816 13.1797 14.3786 11.8991L14.905 8.4775C15.0741 7.37886 14.2304 6.38739 13.1221 6.37512ZM3.65445 12.875H11.7842C12.4628 12.875 13.04 12.3798 13.1432 11.7091L13.6696 8.28743C13.7232 7.93912 13.4537 7.625 13.1013 7.625H5.69425C5.0221 7.625 4.44846 8.11094 4.33796 8.77395L3.65445 12.875Z",
        fill: "#5E6166"
      }
    )
  }
);
const Gif = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.875 5.5C0.875 4.05025 2.05025 2.875 3.5 2.875H4C5.44975 2.875 6.625 4.05025 6.625 5.5V6C6.625 6.34518 6.34518 6.625 6 6.625C5.65482 6.625 5.375 6.34518 5.375 6V5.5C5.375 4.74061 4.75939 4.125 4 4.125H3.5C2.74061 4.125 2.125 4.74061 2.125 5.5V10.5C2.125 11.2594 2.74061 11.875 3.5 11.875H4C4.75939 11.875 5.375 11.2594 5.375 10.5V9.125H4.5C4.15482 9.125 3.875 8.84518 3.875 8.5C3.875 8.15482 4.15482 7.875 4.5 7.875H5.5C6.12132 7.875 6.625 8.37868 6.625 9V10.5C6.625 11.9497 5.44975 13.125 4 13.125H3.5C2.05025 13.125 0.875 11.9497 0.875 10.5V5.5ZM10.375 4C10.375 3.37868 10.8787 2.875 11.5 2.875H14C14.6213 2.875 15.125 3.37868 15.125 4V4.5C15.125 4.84518 14.8452 5.125 14.5 5.125C14.1548 5.125 13.875 4.84518 13.875 4.5V4.125H11.625V7.875H13.5C13.8452 7.875 14.125 8.15482 14.125 8.5C14.125 8.84518 13.8452 9.125 13.5 9.125H11.625V12.5C11.625 12.8452 11.3452 13.125 11 13.125C10.6548 13.125 10.375 12.8452 10.375 12.5V8.5V4ZM9.125 3.5C9.125 3.15482 8.84518 2.875 8.5 2.875C8.15482 2.875 7.875 3.15482 7.875 3.5V12.5C7.875 12.8452 8.15482 13.125 8.5 13.125C8.84518 13.125 9.125 12.8452 9.125 12.5V3.5Z"
      }
    )
  }
);
const Picture = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.875 3.5C0.875 2.05025 2.05025 0.875 3.5 0.875H12.5C13.9497 0.875 15.125 2.05025 15.125 3.5V12.5C15.125 13.9497 13.9497 15.125 12.5 15.125H3.5C2.05025 15.125 0.875 13.9497 0.875 12.5V3.5ZM3.5 2.125C2.74061 2.125 2.125 2.74061 2.125 3.5V12.5C2.125 12.6481 2.14841 12.7907 2.19174 12.9244L9.35095 5.76516C9.98555 5.13056 11.0144 5.13056 11.649 5.76517L13.875 7.99112V3.5C13.875 2.74061 13.2594 2.125 12.5 2.125H3.5ZM13.875 9.75888L10.7652 6.64905C10.6187 6.5026 10.3813 6.5026 10.2348 6.64905L3.07562 13.8083C3.20928 13.8516 3.35191 13.875 3.5 13.875H12.5C13.2594 13.875 13.875 13.2594 13.875 12.5V9.75888ZM6.5 5C6.5 5.82843 5.82843 6.5 5 6.5C4.17157 6.5 3.5 5.82843 3.5 5C3.5 4.17157 4.17157 3.5 5 3.5C5.82843 3.5 6.5 4.17157 6.5 5Z",
        fill: "#5E6166"
      }
    )
  }
);
const Play = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M2.875 2.86159C2.875 1.99778 3.80817 1.45625 4.55816 1.88481L13.5504 7.02322C14.3062 7.4551 14.3062 8.54489 13.5504 8.97677L4.55816 14.1152C3.80817 14.5437 2.875 14.0022 2.875 13.1384V2.86159ZM4.125 3.07698V12.923L12.7403 8L4.125 3.07698Z",
        fill: "#5E6166"
      }
    )
  }
);
const Expand = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M3.5 2.875C3.15482 2.875 2.875 3.15482 2.875 3.5L2.875 8.5C2.875 8.84518 3.15482 9.125 3.5 9.125C3.84518 9.125 4.125 8.84518 4.125 8.5L4.125 4.125L8.5 4.125C8.84518 4.125 9.125 3.84518 9.125 3.5C9.125 3.15482 8.84518 2.875 8.5 2.875L3.5 2.875ZM13.125 7.5C13.125 7.15482 12.8452 6.875 12.5 6.875C12.1548 6.875 11.875 7.15482 11.875 7.5L11.875 11.875L7.5 11.875C7.15482 11.875 6.875 12.1548 6.875 12.5C6.875 12.8452 7.15482 13.125 7.5 13.125L12.5 13.125C12.8452 13.125 13.125 12.8452 13.125 12.5L13.125 7.5Z",
        fill: "white"
      }
    )
  }
);
const PlayFilled = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4.55816 1.88482C3.80817 1.45625 2.875 1.99779 2.875 2.86159L2.875 13.1384C2.875 14.0022 3.80817 14.5437 4.55816 14.1152L13.5504 8.97677C14.3062 8.54489 14.3062 7.45511 13.5504 7.02323L4.55816 1.88482Z"
      }
    )
  }
);
const BackdropMediaPlayer = ({
  onClose,
  item
}) => {
  const mediaElement = useMemo(() => {
    switch (item.type) {
      case MediaItemType.IMAGE:
        return /* @__PURE__ */ jsx(
          "img",
          {
            alt: item.name,
            src: item.url,
            className: "max-w-[90vw] max-h-[90vh] rounded-xl"
          }
        );
      case MediaItemType.VIDEO:
      case MediaItemType.GIF:
        return /* @__PURE__ */ jsx(
          "video",
          {
            src: "/mock-video.mp4",
            className: "max-w-[90vw] max-h-[90vh] rounded-xl",
            controls: true,
            autoPlay: true,
            muted: true
          }
        );
    }
  }, [item]);
  return /* @__PURE__ */ jsx(Backdrop, { onClose, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center relative", children: [
    onClose && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "absolute top-2 right-2 p-3 bg-white/10 hover:bg-white/30 rounded-full transition cursor-pointer z-50",
        children: /* @__PURE__ */ jsx(Cross1Icon, { color: "white" })
      }
    ),
    mediaElement
  ] }) });
};
const playIconMap = {
  [MediaItemType.IMAGE]: /* @__PURE__ */ jsx(Fragment, {}),
  [MediaItemType.VIDEO]: /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-full bg-black/60 absolute", children: /* @__PURE__ */ jsx(PlayFilled, { className: "fill-white" }) }),
  [MediaItemType.GIF]: /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-full bg-black/60 absolute", children: /* @__PURE__ */ jsx(Gif, { className: "fill-white" }) })
};
const ItemThumbnail = ({
  item,
  isSelected,
  listeners,
  setNodeRef
}) => {
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const ref = useRef(null);
  const handleLoad = () => {
    setThumbnailLoaded(true);
  };
  const handleError = () => {
    setThumbnailLoaded(true);
    setIsError(true);
  };
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (ref.current.complete) {
      handleLoad();
    }
    ref.current.onload = handleLoad;
    ref.current.onerror = handleError;
  }, [item.thumbnailUrl]);
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      align: "center",
      justify: "center",
      p: "1",
      className: cn(
        "aspect-square relative rounded-lg duration-100 border",
        isSelected ? "bg-primary/10 border-primary" : "border-transparent group-hover:bg-secondary/20"
      ),
      ref: setNodeRef,
      ...listeners,
      children: [
        !thumbnailLoaded && /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", position: "absolute", children: /* @__PURE__ */ jsx(Spinner, { size: { initial: "1", md: "2", lg: "3" } }) }),
        isError && /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", position: "absolute", children: /* @__PURE__ */ jsx(LinkBreak1Icon, {}) }),
        thumbnailLoaded && playIconMap[item.type],
        /* @__PURE__ */ jsx(
          "img",
          {
            ref,
            src: item.thumbnailUrl,
            alt: item.name,
            className: cn(
              "w-auto h-auto max-w-full max-h-full duration-100 border-2 border-secondary/20 group-hover:border-secondary/30 rounded-md",
              isError && "hidden"
            )
          }
        )
      ]
    }
  );
};
const ItemThumbnail$1 = memo(ItemThumbnail);
const ItemName = ({ item, isSelected }) => {
  const dispatch = useAppDispatch();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState("");
  const renameInputRef = useRef(null);
  const cancelRenaming = () => {
    setIsRenaming(false);
  };
  const applyRenaming = () => {
    setIsRenaming(false);
    if (!newName) {
      return;
    }
    dispatch(renameItem({ newName, itemId: item.id }));
  };
  const handleNameClick = () => {
    setIsRenaming(true);
    setNewName(item.name);
  };
  const handleRenameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleRenameBlur = () => {
    applyRenaming();
  };
  const handleRenameKeyUp = (event) => {
    switch (event.key) {
      case "Enter":
        applyRenaming();
        break;
      case "Escape":
        cancelRenaming();
        break;
    }
  };
  useEffect(() => {
    var _a;
    if (isRenaming) {
      (_a = renameInputRef.current) == null ? void 0 : _a.focus();
    }
  }, [isRenaming]);
  return /* @__PURE__ */ jsx(Flex, { justify: "center", children: isRenaming ? /* @__PURE__ */ jsx(
    "input",
    {
      value: newName,
      onKeyUp: handleRenameKeyUp,
      onChange: handleRenameChange,
      className: "text-center text-xs outline-none focus-within:outline-none max-w-full text-ellipsis\n               whitespace-nowrap overflow-hidden text-secondary/80 rounded-xs hover:bg-secondary/5\n               duration-100 w-[112px] p-1.5 focus-within:bg-secondary/5",
      ref: renameInputRef,
      onBlur: handleRenameBlur
    }
  ) : /* @__PURE__ */ jsx(AppTooltip, { content: item.name, children: /* @__PURE__ */ jsx(
    Text,
    {
      size: "1",
      onClick: handleNameClick,
      className: cn(
        "max-w-full text-ellipsis whitespace-nowrap overflow-hidden  rounded-xs",
        "hover:bg-secondary/5 duration-100 min-w-[112px] text-center p-1.5",
        isSelected ? "text-primary" : "text-secondary/80"
      ),
      children: item.name
    }
  ) }) });
};
const ItemName$1 = memo(ItemName);
const MediaGridItem = ({ item }) => {
  const dispatch = useAppDispatch();
  const selectedItemIds = useAppSelector(selectSelectedItemIds);
  const [expanded, setExpanded] = useState(false);
  const { listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id
  });
  const selectOrder = useMemo(
    () => selectedItemIds.findIndex(
      (selectedItemId) => selectedItemId === item.id
    ),
    [selectedItemIds, item.id]
  );
  const isSelected = selectOrder !== -1;
  const handleExpand = () => {
    setExpanded(true);
  };
  const handleSelection = () => {
    const action = selectOrder === -1 ? addItemToSelection({ itemId: item.id }) : removeItemFromSelection({ itemId: item.id });
    dispatch(action);
  };
  const expandElement = useMemo(
    () => /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute opacity-0 group-hover:opacity-100 duration-100 left-1 top-1 cursor-pointer w-4 h-4\n            flex items-center justify-center",
        onClick: handleExpand,
        children: /* @__PURE__ */ jsx(Expand, {})
      }
    ),
    []
  );
  const selectBoxElement = useMemo(
    () => /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "absolute left-1 bottom-1 cursor-pointer w-5 h-5 rounded-md flex items-center justify-center",
          "transition-[background] duration-100",
          isSelected ? "border-primary bg-primary" : "group-hover:border-[1.5px] group-hover:border-white"
        ),
        onClick: handleSelection,
        children: /* @__PURE__ */ jsx(Text, { size: "1", className: "text-white", children: isSelected ? selectOrder + 1 : "" })
      }
    ),
    [isSelected, selectOrder]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "w-full",
      style: {
        position: "relative",
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 1e3 : "auto"
      },
      children: [
        /* @__PURE__ */ jsxs(Box, { position: "relative", className: "group", children: [
          /* @__PURE__ */ jsx(
            ItemThumbnail$1,
            {
              item,
              listeners,
              setNodeRef,
              isSelected
            }
          ),
          expandElement,
          selectBoxElement,
          expanded && /* @__PURE__ */ jsx(
            BackdropMediaPlayer,
            {
              item,
              onClose: () => setExpanded(false)
            }
          )
        ] }),
        /* @__PURE__ */ jsx(ItemName$1, { item, isSelected })
      ]
    }
  );
};
const filterItems = (items, filters) => {
  const { type, name, folder: folder2 } = filters;
  let filtered = items.concat();
  if (folder2) {
    filtered = filtered.filter((item) => folder2.itemIds.includes(item.id));
  }
  if (type) {
    filtered = filtered.filter((item) => type.includes(item.type));
  }
  if (name) {
    filtered = filtered.filter((item) => item.name.includes(name));
  }
  return filtered;
};
const MediaGrid = ({ folder: folder2 }) => {
  const allItems = useAppSelector(selectItems);
  const activeFilters = useAppSelector(selectActiveFilters);
  const searchString = useAppSelector(selectSearchString);
  const filteredItems = useMemo(
    () => filterItems(allItems, {
      folder: folder2,
      type: activeFilters,
      name: searchString
    }),
    [folder2, allItems, activeFilters, searchString]
  );
  return /* @__PURE__ */ jsx(
    Grid,
    {
      columns: { sm: "3", md: "4", lg: "5", xl: "6" },
      gap: "4",
      p: "2",
      align: "center",
      justify: "center",
      children: filteredItems.map((item) => /* @__PURE__ */ jsx(Flex, { justify: "center", p: "1", children: /* @__PURE__ */ jsx(MediaGridItem, { item }) }, item.id))
    }
  );
};
const FolderItem = ({
  folder: folder2,
  isSelected,
  onSelect,
  droppable = false
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: folder2.id,
    disabled: !droppable
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: setNodeRef,
      className: cn(
        "duration-100 hover:bg-secondary/5 rounded-md overflow-hidden mb-1",
        isSelected && "bg-secondary/5 hover:bg-secondary/10",
        isOver && "bg-primary"
      ),
      children: /* @__PURE__ */ jsxs(
        Flex,
        {
          gapX: "2",
          align: "center",
          px: "2",
          py: "1",
          className: "cursor-pointer overflow-hidden max-w-full",
          onClick: () => onSelect(folder2),
          children: [
            /* @__PURE__ */ jsx(Folder, { className: "flex-shrink-0" }),
            /* @__PURE__ */ jsx(Text, { className: "text-secondary overflow-hidden whitespace-nowrap text-ellipsis flex-grow min-w-0", children: folder2.name }),
            /* @__PURE__ */ jsx(Text, { className: "text-secondary/40", children: folder2.itemIds.length })
          ]
        }
      )
    }
  );
};
const FolderList = ({
  onSelect,
  selected,
  droppable = false
}) => {
  const folders = useAppSelector(selectFolders);
  return /* @__PURE__ */ jsx(Box, { overflow: "auto", className: "hide-overflow-on-dnd", children: folders.map((folder2) => /* @__PURE__ */ jsx(
    FolderItem,
    {
      droppable,
      onSelect,
      isSelected: folder2.id === (selected == null ? void 0 : selected.id),
      folder: folder2
    },
    folder2.id
  )) });
};
const FolderList$1 = memo(FolderList);
const mediaTypeMap = {
  [MediaItemType.IMAGE]: {
    Icon: Picture,
    text: "Images"
  },
  [MediaItemType.VIDEO]: {
    Icon: Play,
    text: "Videos"
  },
  [MediaItemType.GIF]: {
    Icon: Gif,
    text: "GIFs"
  }
};
const FilterListItem = ({
  type,
  onSelect,
  count,
  selected
}) => {
  const item = mediaTypeMap[type];
  const handleClick = () => {
    onSelect(type);
  };
  return /* @__PURE__ */ jsx("label", { children: /* @__PURE__ */ jsxs(
    Flex,
    {
      justify: "between",
      align: "center",
      px: "2",
      py: "1",
      className: "cursor-pointer hover:bg-secondary/10 rounded-md duration-100",
      children: [
        /* @__PURE__ */ jsxs(Flex, { align: "center", gapX: "2", children: [
          /* @__PURE__ */ jsx(item.Icon, {}),
          /* @__PURE__ */ jsx(Text, { className: "text-secondary", children: item.text }),
          /* @__PURE__ */ jsx(Text, { className: "text-secondary/40", children: count })
        ] }),
        /* @__PURE__ */ jsx(Checkbox, { checked: selected, onClick: handleClick })
      ]
    }
  ) });
};
const FilterList = () => {
  const appliedFilters = useAppSelector(selectActiveFilters);
  const selectedFolder = useSelector(selectSelectedFolder);
  const allItems = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const handleSearchChange = useDebouncedCallback((event) => {
    const searchString = event.target.value;
    dispatch(setSearchString({ searchString }));
  }, 250);
  const allFiltersCheckmarkValue = useMemo(() => {
    if (!appliedFilters.length) {
      return false;
    }
    if (appliedFilters.length === allMediaTypes.length) {
      return true;
    }
    return "indeterminate";
  }, [appliedFilters]);
  const handleSelect = (type) => {
    const action = appliedFilters.includes(type) ? removeFilter({ filter: type }) : addFilter({ filter: type });
    dispatch(action);
  };
  const handleAllFiltersClick = () => {
    const action = allFiltersCheckmarkValue ? clearFilters() : fillFilters();
    dispatch(action);
  };
  const handleVisibilityToggle = () => {
    setIsOpen((o) => !o);
  };
  const filterListItemElements = allMediaTypes.map((type) => /* @__PURE__ */ jsx(
    FilterListItem,
    {
      type,
      selected: appliedFilters.includes(type),
      onSelect: handleSelect,
      count: allItems.filter(
        (item) => (selectedFolder == null ? void 0 : selectedFolder.itemIds.includes(item.id)) && item.type === type
      ).length ?? 0
    },
    type
  ));
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", gapY: "4", children: [
    /* @__PURE__ */ jsxs(Flex, { direction: "column", gapY: "2", children: [
      /* @__PURE__ */ jsxs(Flex, { justify: "between", align: "center", px: "2", children: [
        /* @__PURE__ */ jsxs(
          Flex,
          {
            align: "center",
            gap: "2",
            onClick: handleVisibilityToggle,
            className: "cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(Text, { wrap: "nowrap", size: "1", className: "text-secondary/60", children: "Media type" }),
              /* @__PURE__ */ jsx(
                Chevron,
                {
                  className: cn("duration-100", isOpen ? "" : "rotate-180")
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: allFiltersCheckmarkValue,
            onClick: handleAllFiltersClick
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Flex,
        {
          direction: "column",
          overflow: "hidden",
          className: cn("duration-100", isOpen ? "max-h-full" : "max-h-0"),
          children: filterListItemElements
        }
      )
    ] }),
    /* @__PURE__ */ jsx(TextField.Root, { placeholder: "Search", onChange: handleSearchChange, children: /* @__PURE__ */ jsx(TextField.Slot, { children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { height: "16", width: "16" }) }) })
  ] });
};
const FilterList$1 = memo(FilterList);
const FolderSelector = ({
  selected,
  disabled,
  onSelect,
  tooltip,
  width = "150px"
}) => {
  const folders = useAppSelector(selectFolders);
  return /* @__PURE__ */ jsxs(
    Select.Root,
    {
      value: selected.id,
      onValueChange: (v) => onSelect(folders.find((f) => f.id === v)),
      children: [
        /* @__PURE__ */ jsx(AppTooltip, { content: tooltip, children: /* @__PURE__ */ jsx(
          Select.Trigger,
          {
            disabled,
            style: { width },
            className: "bg-transparent px-3 py-1 rounded-md text-secondary border border-secondary/10 flex items-center\n                  justify-between cursor-pointer hover:border-secondary/20 duration-100 box-border",
            children: /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "2", children: [
              /* @__PURE__ */ jsx(Folder, {}),
              /* @__PURE__ */ jsx(Text, { className: "!leading-[22px]", children: (selected == null ? void 0 : selected.name) ?? "-" })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsx(Select.Content, { position: "item-aligned", children: folders.map((folder2) => /* @__PURE__ */ jsx(Select.Item, { value: folder2.id, children: /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "start", gap: "1", children: [
          /* @__PURE__ */ jsx(Folder, {}),
          /* @__PURE__ */ jsx(Text, { className: "text-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]", children: folder2.name })
        ] }) }, folder2.id)) })
      ]
    }
  );
};
const FolderSelector$1 = memo(FolderSelector);
const FolderNavigation = () => {
  const selected = useAppSelector(selectSelectedFolder);
  const navigate = useNavigate();
  const handleSelect = (folder2) => {
    navigate(generatePath(AppRoute.FOLDER, { folderId: folder2.id }));
  };
  return /* @__PURE__ */ jsx(FolderList$1, { droppable: true, selected, onSelect: handleSelect });
};
const FolderNavigation$1 = memo(FolderNavigation);
const UploadFileInput = () => {
  const dispatch = useAppDispatch();
  const selectedFolder = useAppSelector(selectSelectedFolder);
  const initialDormData = useMemo(
    () => ({
      width: 400,
      height: 400,
      loremPicsumId: "1",
      folder: selectedFolder,
      type: MediaItemType.IMAGE,
      name: "test.png"
    }),
    [selectedFolder]
  );
  const [formData, setFormData] = useState({
    ...initialDormData
  });
  useEffect(() => {
    if (selectedFolder) {
      setFormData((fd) => ({ ...fd, folder: selectedFolder }));
    }
  }, [selectedFolder]);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  const handleCreate = () => {
    const folderId = formData.folder.id;
    const url = `https://picsum.photos/id/${formData.loremPicsumId}/${formData.width}/${formData.height}`;
    const newItem = {
      url,
      id: uuid.v4(),
      name: formData.name,
      type: formData.type,
      thumbnailUrl: url
    };
    dispatch(addItems({ items: [newItem], folderId }));
    setFormData({ ...initialDormData });
  };
  return /* @__PURE__ */ jsxs(Dialog.Root, { children: [
    /* @__PURE__ */ jsx(AppTooltip, { content: "Upload a file", children: /* @__PURE__ */ jsx(Dialog.Trigger, { children: /* @__PURE__ */ jsx(Button, { children: /* @__PURE__ */ jsx(FilePlusIcon, {}) }) }) }),
    /* @__PURE__ */ jsxs(Dialog.Content, { children: [
      /* @__PURE__ */ jsx(Dialog.Title, { children: "Upload a file" }),
      /* @__PURE__ */ jsx(Dialog.Description, { children: /* @__PURE__ */ jsx(Text, { children: "Mock a file as being uploaded to server" }) }),
      /* @__PURE__ */ jsxs(Flex, { direction: "column", gapY: "2", pt: "5", pb: "2", children: [
        /* @__PURE__ */ jsx(
          FolderSelector$1,
          {
            width: "200px",
            selected: formData.folder ?? selectedFolder,
            onSelect: (folder2) => setFormData((fd) => ({ ...fd, folder: folder2 }))
          }
        ),
        /* @__PURE__ */ jsx(
          TextField.Root,
          {
            placeholder: "Width",
            name: "width",
            type: "number",
            className: "w-[200px]",
            min: "0",
            onChange: handleChange,
            children: /* @__PURE__ */ jsx(TextField.Slot, { children: /* @__PURE__ */ jsx(WidthIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsx(
          TextField.Root,
          {
            placeholder: "Height",
            name: "height",
            type: "number",
            className: "w-[200px]",
            min: "0",
            onChange: handleChange,
            children: /* @__PURE__ */ jsx(TextField.Slot, { children: /* @__PURE__ */ jsx(HeightIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsxs(Select.Root, { defaultValue: MediaItemType.IMAGE, children: [
          /* @__PURE__ */ jsx(Select.Trigger, { className: "!w-[200px]" }),
          /* @__PURE__ */ jsx(Select.Content, { children: allMediaTypes.map((type) => /* @__PURE__ */ jsx(Select.Item, { value: type, children: type }, type)) })
        ] }),
        /* @__PURE__ */ jsx(
          TextField.Root,
          {
            placeholder: "File name",
            name: "name",
            className: "w-[200px]",
            onChange: handleChange,
            children: /* @__PURE__ */ jsx(TextField.Slot, { children: /* @__PURE__ */ jsx(Pencil1Icon, {}) })
          }
        ),
        /* @__PURE__ */ jsx(
          TextField.Root,
          {
            placeholder: "Lorem picsum ID",
            name: "loremPicsumId",
            className: "w-[200px]",
            onChange: handleChange,
            children: /* @__PURE__ */ jsx(TextField.Slot, { children: /* @__PURE__ */ jsx(StarIcon, {}) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Flex, { gap: "3", mt: "4", justify: "end", children: [
        /* @__PURE__ */ jsx(Dialog.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "soft", color: "gray", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(Dialog.Close, { children: /* @__PURE__ */ jsx(Button, { onClick: handleCreate, children: "Save" }) })
      ] })
    ] })
  ] });
};
const UploadFileInput$1 = memo(UploadFileInput);
const FolderHero = ({ title, subtitle }) => {
  return /* @__PURE__ */ jsx(
    Flex,
    {
      align: "center",
      justify: "center",
      width: "100%",
      position: "absolute",
      top: "0",
      bottom: "0",
      children: /* @__PURE__ */ jsxs(Flex, { align: "center", direction: "column", gap: "2", children: [
        /* @__PURE__ */ jsx("img", { alt: "media gallery", src: "/empty-folder-hero.png" }),
        title && /* @__PURE__ */ jsx(Heading, { weight: "medium", mt: "4", style: { fontSize: "30px" }, children: title }),
        subtitle && /* @__PURE__ */ jsx(Text, { children: subtitle })
      ] })
    }
  );
};
const Sidebar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchFolders());
  }, []);
  return /* @__PURE__ */ jsx(Box, { pt: "4", pb: "8", pr: "2", pl: "4", height: "100vh", maxHeight: "100vh", children: /* @__PURE__ */ jsxs(Flex, { height: "100%", direction: "column", gapY: "8", children: [
    /* @__PURE__ */ jsx(NavLink, { to: AppRoute.HOME, children: /* @__PURE__ */ jsxs(Flex, { gapX: "2", align: "center", children: [
      /* @__PURE__ */ jsx(Avatar, { fallback: "M", src: "/icon.png", size: "2" }),
      /* @__PURE__ */ jsx(Text, { size: "3", weight: "regular", children: "Media gallery" })
    ] }) }),
    /* @__PURE__ */ jsxs(Flex, { direction: "column", gapY: "4", overflow: "auto", children: [
      /* @__PURE__ */ jsx(Text, { size: "2", weight: "medium", className: "px-2", children: "Folders" }),
      /* @__PURE__ */ jsx(FolderNavigation$1, {}),
      /* @__PURE__ */ jsx(CreateFolderInput, {})
    ] }),
    /* @__PURE__ */ jsxs(Flex, { direction: "column", gapY: "4", children: [
      /* @__PURE__ */ jsx(Text, { size: "2", weight: "medium", className: "px-2", children: "Filters" }),
      /* @__PURE__ */ jsx(FilterList$1, {})
    ] })
  ] }) });
};
const Topbar = () => {
  const selectedFolder = useAppSelector(selectSelectedFolder);
  const selectedItemIds = useAppSelector(selectSelectedItemIds);
  const dispatch = useAppDispatch();
  const handleFolderSelect = (folder2) => {
    if (!selectedFolder) {
      return;
    }
    dispatch(clearItemSelection());
    if (selectedFolder.id === folder2.id) {
      return;
    }
    dispatch(
      moveItems({
        itemIds: selectedItemIds,
        srcFolderId: selectedFolder.id,
        dstFolderId: folder2.id
      })
    );
  };
  const handleAllItemsSelectClick = () => {
    if (!selectedFolder) {
      return;
    }
    const action = selectedItemIds.length ? clearItemSelection() : setItemSelection({
      itemIds: selectedFolder.itemIds
    });
    dispatch(action);
  };
  const handleDelete = () => {
    if (!selectedFolder) {
      return;
    }
    dispatch(
      deleteItems({
        itemIds: selectedItemIds,
        folderId: selectedFolder.id
      })
    );
    dispatch(clearItemSelection());
  };
  const checkboxState = useMemo(() => {
    if (!selectedItemIds.length) {
      return false;
    }
    if (selectedItemIds.length === (selectedFolder == null ? void 0 : selectedFolder.itemIds.length)) {
      return true;
    }
    return "indeterminate";
  }, [selectedItemIds.length, selectedFolder == null ? void 0 : selectedFolder.itemIds.length]);
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      flexShrink: "0",
      align: "center",
      height: "64px",
      gapX: "6",
      mr: "2",
      className: "border-b border-b-secondary/10",
      children: [
        /* @__PURE__ */ jsx("label", { children: /* @__PURE__ */ jsxs(Flex, { align: "center", gapX: "2", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              onClick: handleAllItemsSelectClick,
              checked: checkboxState
            }
          ),
          /* @__PURE__ */ jsxs(Text, { className: "text-secondary/60", children: [
            selectedItemIds.length,
            " selected"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(Flex, { gapX: "3", children: [
          !!selectedItemIds.length && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              FolderSelector$1,
              {
                onSelect: handleFolderSelect,
                disabled: !selectedItemIds.length,
                selected: selectedFolder,
                tooltip: "Move items to"
              }
            ),
            /* @__PURE__ */ jsx(
              AppTooltip,
              {
                content: `Delete ${selectedItemIds.length} items`,
                children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    disabled: !selectedItemIds.length,
                    onClick: handleDelete,
                    children: /* @__PURE__ */ jsx(TrashIcon, {})
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsx(UploadFileInput$1, {})
        ] })
      ]
    }
  );
};
const AppTooltip = (props) => {
  return !!props.content ? /* @__PURE__ */ jsx(Tooltip, { ...props, children: props.children }) : props.children;
};
const Modal = ({ children }) => {
  return createPortal(children, document.body);
};
const Backdrop = ({
  children,
  onClose,
  open = true
}) => {
  const backdropRef = useRef(null);
  const handleClick = (event) => {
    if (event.target === backdropRef.current) {
      onClose == null ? void 0 : onClose();
    }
  };
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: backdropRef,
      className: "absolute flex items-center justify-center w-screen h-[100vh] max-w-screen max-h-[100vh]\n            bg-black/50 cursor-default z-50 top-0 left-0",
      onClick: handleClick,
      children
    }
  ) });
};
const AppLayout = () => {
  return /* @__PURE__ */ jsxs(Flex, {
    maxWidth: "100vw",
    height: "100vh",
    children: [/* @__PURE__ */ jsx(Box, {
      minWidth: "232px",
      maxWidth: "232px",
      children: /* @__PURE__ */ jsx(Box, {
        minWidth: "232px",
        maxWidth: "232px",
        position: "fixed",
        children: /* @__PURE__ */ jsx(Sidebar, {})
      })
    }), /* @__PURE__ */ jsxs(Flex, {
      direction: "column",
      flexGrow: "1",
      children: [/* @__PURE__ */ jsx(Topbar, {}), /* @__PURE__ */ jsx(Box, {
        flexGrow: "1",
        children: /* @__PURE__ */ jsx(Outlet, {})
      })]
    })]
  });
};
const index = withComponentProps(AppLayout);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const Home = () => {
  return /* @__PURE__ */ jsx(Box, {
    width: "100%",
    minHeight: "100%",
    position: "relative",
    children: /* @__PURE__ */ jsx(FolderHero, {
      title: "Select a folder to begin"
    })
  });
};
const home = withComponentProps(Home);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const FolderPage = ({
  params
}) => {
  const {
    folderId
  } = params;
  const allFolders = useAppSelector(selectFolders);
  const folder2 = useAppSelector((state) => selectFolder(state, folderId));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveFolder({
      folderId: folder2 == null ? void 0 : folder2.id
    }));
    dispatch(clearItemSelection());
    return () => {
      dispatch(setActiveFolder({
        folderId: void 0
      }));
      dispatch(clearItemSelection());
    };
  }, [folderId, allFolders]);
  const content = useMemo(() => {
    if (!folder2) {
      return /* @__PURE__ */ jsx(FolderHero, {
        title: "404 Folder not found"
      });
    }
    if (!folder2.itemIds.length) {
      return /* @__PURE__ */ jsx(FolderHero, {
        title: "This folder is empty",
        subtitle: "Add images, videos and GIFs."
      });
    }
    return /* @__PURE__ */ jsx(MediaGrid, {
      folder: folder2
    });
  }, [folder2]);
  return /* @__PURE__ */ jsx(Box, {
    width: "100%",
    minHeight: "100%",
    position: "relative",
    children: content
  });
};
const folder = withComponentProps(FolderPage);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: folder
}, Symbol.toStringTag, { value: "Module" }));
const NotFound = () => {
  return /* @__PURE__ */ jsx("div", {
    children: "404 Not Found"
  });
};
const notFound = withComponentProps(NotFound);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: notFound
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/planable-assignmentassets/entry.client-DshFUUSh.js", "imports": ["/planable-assignmentassets/chunk-SYFQ2XB5-ePwPyWlc.js", "/planable-assignmentassets/index-Gr51Cw-a.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/planable-assignmentassets/root-LwqibvFq.js", "imports": ["/planable-assignmentassets/chunk-SYFQ2XB5-ePwPyWlc.js", "/planable-assignmentassets/index-Gr51Cw-a.js", "/planable-assignmentassets/with-props-Nl8GaAsT.js", "/planable-assignmentassets/redux-D9f6bYtA.js"], "css": ["/planable-assignmentassets/root-BpwCKvMc.css"] }, "components/AppLayout/index": { "id": "components/AppLayout/index", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/planable-assignmentassets/index-BN_krU54.js", "imports": ["/planable-assignmentassets/with-props-Nl8GaAsT.js", "/planable-assignmentassets/chunk-SYFQ2XB5-ePwPyWlc.js", "/planable-assignmentassets/index-D4RdMiD_.js", "/planable-assignmentassets/redux-D9f6bYtA.js", "/planable-assignmentassets/index-Gr51Cw-a.js"], "css": [] }, "routes/home": { "id": "routes/home", "parentId": "components/AppLayout/index", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/planable-assignmentassets/home-BF5mQhUp.js", "imports": ["/planable-assignmentassets/with-props-Nl8GaAsT.js", "/planable-assignmentassets/chunk-SYFQ2XB5-ePwPyWlc.js", "/planable-assignmentassets/redux-D9f6bYtA.js", "/planable-assignmentassets/index-Gr51Cw-a.js", "/planable-assignmentassets/index-D4RdMiD_.js", "/planable-assignmentassets/index-HtxMOTJK.js"], "css": [] }, "routes/folder": { "id": "routes/folder", "parentId": "components/AppLayout/index", "path": "/:folderId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/planable-assignmentassets/folder-CESmNUrw.js", "imports": ["/planable-assignmentassets/with-props-Nl8GaAsT.js", "/planable-assignmentassets/chunk-SYFQ2XB5-ePwPyWlc.js", "/planable-assignmentassets/redux-D9f6bYtA.js", "/planable-assignmentassets/index-D4RdMiD_.js", "/planable-assignmentassets/index-Gr51Cw-a.js", "/planable-assignmentassets/index-HtxMOTJK.js"], "css": [] }, "routes/not-found": { "id": "routes/not-found", "parentId": "components/AppLayout/index", "path": "/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/planable-assignmentassets/not-found-eriLIQRU.js", "imports": ["/planable-assignmentassets/with-props-Nl8GaAsT.js", "/planable-assignmentassets/chunk-SYFQ2XB5-ePwPyWlc.js"], "css": [] } }, "url": "/planable-assignmentassets/manifest-430d9cf7.js", "version": "430d9cf7" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/planable-assignment";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "components/AppLayout/index": {
    id: "components/AppLayout/index",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "components/AppLayout/index",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/folder": {
    id: "routes/folder",
    parentId: "components/AppLayout/index",
    path: "/:folderId",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/not-found": {
    id: "routes/not-found",
    parentId: "components/AppLayout/index",
    path: "/*",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
