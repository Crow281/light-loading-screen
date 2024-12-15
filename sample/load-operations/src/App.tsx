import "./App.css";
import { OneOffExample } from "./Examples/OneOff/OneOffExample";
import { TabPanel } from "./Widgets/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { AwaitScriptExample } from "Examples/AwaitScript/AwaitScriptExample";
import { TryAgainExample } from "Examples/TryAgain/TryAgainExample";
import React from "react";

/**
 *
 * @returns
 * Root element of the App.
 */
function App() {
    //Currently selected tab.
    const [tabIndex, setTabIndex] = React.useState(0);

    //Allows tab to update tab index.
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <div>
            <h1>Load Operations</h1>
            <h2>Introduction</h2>
            <p>
                LoadingScreen is a lightweight UI utility to show your users a
                simple spinner animation until whatever operation you are
                waiting on has concluded.
            </p>
            <p>
                Each of these demos will play the loading screen until a brief
                timeout is over.
            </p>
            <p>
                Github project page is{" "}
                <a href="https://github.com/Crow281/light-loading-screen/">
                    here
                </a>
                .
            </p>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="One Off Operation" />
                        <Tab label="Try Again" />
                        <Tab label="Await Script" />
                    </Tabs>
                </Box>
                <TabPanel tabIndex={0} selectedIndex={tabIndex}>
                    <OneOffExample />
                </TabPanel>
                <TabPanel tabIndex={1} selectedIndex={tabIndex}>
                    <TryAgainExample />
                </TabPanel>
                <TabPanel tabIndex={2} selectedIndex={tabIndex}>
                    <AwaitScriptExample />
                </TabPanel>
            </Box>
        </div>
    );
}

export default App;
