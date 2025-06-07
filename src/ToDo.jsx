import { useState } from 'react'
import { persistor, store } from './store/store'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
function ToDo() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default ToDo
