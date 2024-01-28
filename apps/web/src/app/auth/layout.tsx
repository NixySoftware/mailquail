const AuthLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    return <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[400px]">{children}</div>;
};

export default AuthLayout;
