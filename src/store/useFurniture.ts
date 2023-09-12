import { type LeftorRight, type FurnitureState } from "types/service";
import { create } from "zustand";

const IMAGE_BOOLEAN: boolean = false;
const IMAGE_DIRECTION: LeftorRight = "left";

interface Furniture {
  furnitureState: FurnitureState;
  setFurnitureState: (id: string, direction: LeftorRight) => void;
  resetFurnitureState: () => void;
}
export const useFurniture = create<Furniture>((set) => ({
  furnitureState: {
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
  setFurnitureState: (id, direction) => {
    if (id === `/furniture/6781e537-778d-41cd-95e3-4e7e8cd562ad`) {
      set((state) => ({
        furnitureState: {
          ...state.furnitureState,
          sopa: {
            ...state.furnitureState.sopa,
            direction,
            visible: !state.furnitureState.sopa.visible ? true : state.furnitureState.sopa.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/f47297b6-5f25-431c-8b8c-8ab5bfc7e0bc`) {
      set((state) => ({
        furnitureState: {
          ...state.furnitureState,
          closet: {
            ...state.furnitureState.closet,
            direction,
            visible: !state.furnitureState.closet.visible ? true : state.furnitureState.closet.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/0a606712-a6a3-4159-9ffd-70d3cead955a`) {
      set((state) => ({
        furnitureState: {
          ...state.furnitureState,
          ramp1: {
            ...state.furnitureState.ramp1,
            direction,
            visible: !state.furnitureState.ramp1.visible ? true : state.furnitureState.ramp1.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/7d6e3cf9-d43c-4159-8e0a-d14580505595`) {
      set((state) => ({
        furnitureState: {
          ...state.furnitureState,
          ramp2: {
            ...state.furnitureState.ramp2,
            direction,
            visible: !state.furnitureState.ramp2.visible ? true : state.furnitureState.ramp2.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/7938b2f4-fad6-4a09-bb4d-f40d2e9b2f1b`) {
      set((state) => ({
        furnitureState: {
          ...state.furnitureState,
          table: {
            ...state.furnitureState.table,
            direction,
            visible: !state.furnitureState.table.visible ? true : state.furnitureState.table.direction !== direction,
          },
        },
      }));
    } else if (id === `/furniture/ee3c2c7d-aba8-41ef-adb2-5269dd4a1012`) {
      set((state) => ({
        furnitureState: {
          ...state.furnitureState,
          clock: {
            ...state.furnitureState.clock,
            direction,
            visible: !state.furnitureState.clock.visible ? true : state.furnitureState.clock.direction !== direction,
          },
        },
      }));
    }
  },
  resetFurnitureState: () => {
    set(() => ({
      furnitureState: {
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
    }));
  },
}));
