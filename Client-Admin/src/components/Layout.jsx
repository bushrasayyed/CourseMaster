function Layout({ children }) {
    const drawerWidth = 240;
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Appbar /> {/* This should be rendered only once */}
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: "64px", // Adjust to match Appbar height
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          {children} {/* Ensure there’s no extra CourseMaster or avatar here */}
        </Box>
      </Box>
    );
  }
  
  export default Layout;
  