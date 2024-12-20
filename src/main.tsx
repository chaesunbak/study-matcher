import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/common/Layout.tsx';
import Home from './pages/Home.tsx';
import Search from './pages/Search.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';
import GroupLayout from './components/groupdetail/GroupLayout.tsx';
import GroupMain from './pages/GroupMain.tsx';
import GroupMembers from './pages/GroupMembers.tsx';
import GroupManage from './pages/GroupManage.tsx';
import GroupCreate from './pages/GroupCreate.tsx';
import PostList from './pages/PostList.tsx';
import PostDetail from './pages/PostDetail.tsx';
import PostWrite from './pages/PostWrite.tsx';
import GroupManageList from './pages/GroupManageList.tsx';
import Logout from './pages/Logout.tsx';
import UserModify from './pages/UserModify.tsx';
import ProfileLayout from './components/user/ProfileMenu/ProfileLayout.tsx';
import ResetPw from './pages/ResetPw.tsx';
import WithdrawUser from './pages/WithdrawUser.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            {/* 유저관련 */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:user_id" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="modify" element={<UserModify />} />
              <Route path="manage" element={<GroupManageList />} />
              <Route path="logout" element={<Logout />} />
              <Route path="reset-password" element={<ResetPw />} />
              <Route path="withdraw" element={<WithdrawUser />} />
            </Route>
            {/* 그룹관련 */}
            <Route path="/groups/:group_id" element={<GroupLayout />}>
              <Route index element={<GroupMain />} />
              <Route path="members" element={<GroupMembers />} />
              <Route path="posts" element={<PostList />} />
              <Route path="posts/write" element={<PostWrite />} />
              <Route path="posts/:post_id" element={<PostDetail />} />
              <Route path="manage" element={<GroupManage />} />
            </Route>

            <Route path="/groups/create" element={<GroupCreate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
