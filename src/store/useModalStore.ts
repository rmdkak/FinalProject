import { create } from "zustand";

interface Store {
  modalState: boolean;
  targetModal: string | null;
  setTargetModal: (id: string) => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const useModalStore = create<Store>()((set) => ({
  // 모달 기본값
  modalState: false,
  targetModal: null,
  setTargetModal: (id) => {
    set(() => ({ targetModal: id }));
  },
  // 모달 여는 함수
  onOpenModal: () => {
    set(() => ({ modalState: true }));
  },
  // 모달 닫는 함수
  onCloseModal: () => {
    set(() => ({ modalState: false }));
  },
}));
