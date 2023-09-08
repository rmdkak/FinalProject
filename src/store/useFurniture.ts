import { type LeftorRight, type FurnitureState } from "types/service";
import { create } from "zustand";

const IMAGE_BOOLEAN: boolean = false;
const IMAGE_DIRECTION: LeftorRight = "left";
// const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;
interface Furniture {
  imageState: FurnitureState;
  setImageState: (id: string, direction: LeftorRight) => void;

  furnitureImageData: string[];
  setFurnitureImageData: (imageData: string[]) => void;
}
export const useFurniture = create<Furniture>((set) => ({
  imageState: {
    sopa: {
      visible: IMAGE_BOOLEAN,
      id: `/furniture/6781e537-778d-41cd-95e3-4e7e8cd562ad`,
      direction: IMAGE_DIRECTION,
    },
    closet: {
      visible: IMAGE_BOOLEAN,
      id: `/furniture/f47297b6-5f25-431c-8b8c-8ab5bfc7e0bc`,
      direction: IMAGE_DIRECTION,
    },
    ramp1: {
      visible: IMAGE_BOOLEAN,
      id: `/furniture/0a606712-a6a3-4159-9ffd-70d3cead955a`,
      direction: IMAGE_DIRECTION,
    },
    ramp2: {
      visible: IMAGE_BOOLEAN,
      id: `/furniture/7d6e3cf9-d43c-4159-8e0a-d14580505595`,
      direction: IMAGE_DIRECTION,
    },
    table: {
      visible: IMAGE_BOOLEAN,
      id: `/furniture/7938b2f4-fad6-4a09-bb4d-f40d2e9b2f1b`,
      direction: IMAGE_DIRECTION,
    },
    clock: {
      visible: IMAGE_BOOLEAN,
      id: `/furniture/ee3c2c7d-aba8-41ef-adb2-5269dd4a1012`,
      direction: IMAGE_DIRECTION,
    },
  },
  setImageState: (id, direction) => {
    if (id === `/furniture/6781e537-778d-41cd-95e3-4e7e8cd562ad`) {
      set((state) => ({
        imageState: {
          ...state.imageState,
          sopa: {
            ...state.imageState.sopa,
            direction,
            visible: !state.imageState.sopa.visible ? true : state.imageState.sopa.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/f47297b6-5f25-431c-8b8c-8ab5bfc7e0bc`) {
      set((state) => ({
        imageState: {
          ...state.imageState,
          closet: {
            ...state.imageState.closet,
            direction,
            visible: !state.imageState.closet.visible ? true : state.imageState.closet.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/0a606712-a6a3-4159-9ffd-70d3cead955a`) {
      set((state) => ({
        imageState: {
          ...state.imageState,
          ramp1: {
            ...state.imageState.ramp1,
            direction,
            visible: !state.imageState.ramp1.visible ? true : state.imageState.ramp1.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/7d6e3cf9-d43c-4159-8e0a-d14580505595`) {
      set((state) => ({
        imageState: {
          ...state.imageState,
          ramp2: {
            ...state.imageState.ramp2,
            direction,
            visible: !state.imageState.ramp2.visible ? true : state.imageState.ramp2.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/7938b2f4-fad6-4a09-bb4d-f40d2e9b2f1b`) {
      set((state) => ({
        imageState: {
          ...state.imageState,
          table: {
            ...state.imageState.table,
            direction,
            visible: !state.imageState.table.visible ? true : state.imageState.table.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/ee3c2c7d-aba8-41ef-adb2-5269dd4a1012`) {
      set((state) => ({
        imageState: {
          ...state.imageState,
          clock: {
            ...state.imageState.clock,
            direction,
            visible: !state.imageState.clock.visible ? true : state.imageState.clock.direction !== direction,
          },
        },
      }));
    }
  },

  furnitureImageData: [],
  setFurnitureImageData: (imageData) => {
    set(() => ({
      furnitureImageData: imageData,
    }));
  },
}));
