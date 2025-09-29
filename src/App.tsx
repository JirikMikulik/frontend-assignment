import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {Navigate, Route, Routes} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import CommonLayout from './layouts/CommonLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTodo from './pages/Todo';
import TodosHome from './pages/TodosHome';
import {Welcome} from './pages/Welcome';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>

      {/*
       * start from here
       */}
      <Routes>
        <Route index element={<Welcome />} />

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="todos"
          element={
            <ProtectedRoute>
              <CommonLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TodosHome />} />
          <Route path="newtodo" element={<NewTodo />} />
          <Route path=":id" element={<NewTodo />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
