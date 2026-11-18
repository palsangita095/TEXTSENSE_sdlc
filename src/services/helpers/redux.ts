import { AppDispatch, Rootstate } from "@/type/type/redux.type";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSeletor: TypedUseSelectorHook<Rootstate> = useSelector;