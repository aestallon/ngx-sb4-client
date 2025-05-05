import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {ComponentModel} from 'api';

type ViewState = {
  isLoading: boolean;
  componentModel: ComponentModel;
}

const initialState: ViewState = {
  isLoading: false,
  componentModel: {
    uuid: '',
    name: '',
    constraints: [],
    data: {},
    layouts: {},
    actions: [],
  },
};

export const ViewStore = signalStore(
  withState(initialState),
  withHooks({
    onInit(store) {

    },
    onDestroy(store) {

    },
  }),
  withMethods((store) => ({
    setComponentModel(componentModel: ComponentModel): void {
      patchState(store, state => ({componentModel}));
    },
  })),
);
