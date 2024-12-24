/* eslint-disable react/prop-types */
import Navbar from "./Navbar"
import AccountUsage from "./AccountUsage"
import Sidebar from "./Sidebar"
import SendMoney from "./SendMoney"
import ViewHistory from "./ViewHistory"
import SetTrasactionLimits from "./SetTrasactionLimits"
import ReceiveMoney from "./RecieveMoney"
import RefundAndDisputeResolution from "./Refund&DisputeResolution"
import { motion, AnimatePresence, useElementScroll } from "framer-motion";
import "../custom.css";
import { useParams } from "react-router-dom"
import { useEffect } from "react"
function TabContent({ handleTabs, setHandleTabs, enteredValues,focus,setFocus}) {
    const pageVariants = {
        hidden: { opacity: 0, x: -50 }, // Initial state: fades out and slides left
        visible: { opacity: 1, x: 0 }, // Animate to this state: fully visible
        exit: { opacity: 0, x: 50 }, // Exit animation: fades out and slides right
    };
    const { tabId } = useParams();

    useEffect(() => {
        // When the URL changes, update handleTabs state
        setHandleTabs({ tab: tabId });
    }, [tabId]);


    return (
        <>

            <div className="main-content">
                <Sidebar tabId={tabId} handleTabs={handleTabs} setHandleTabs={setHandleTabs} focus={focus} setFocus={setFocus}/>

                {/* Animated Page Transitions */}
                <AnimatePresence mode="wait">
                    {handleTabs.tab === "send" && (
                        <motion.div
                            key="send"
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <SendMoney />
                        </motion.div>
                    )}

                    {handleTabs.tab === "view-history" && (
                        <motion.div
                            key="view-history"
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <ViewHistory enteredValues={enteredValues} />
                        </motion.div>
                    )}

                    {handleTabs.tab === "set-transaction-limits" && (
                        <motion.div
                            key="set-transaction-limits"
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <SetTrasactionLimits />
                        </motion.div>
                    )}
                    {handleTabs.tab === "receive" && (
                        <motion.div
                            key="receive"
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <ReceiveMoney enteredValues={enteredValues} />
                        </motion.div>
                    )}
                    {handleTabs.tab === "refund" && (
                        <motion.div
                            key="refund"
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <RefundAndDisputeResolution />
                        </motion.div>
                    )}

                    {handleTabs.tab === "account-usage" && (
                        <motion.div
                            key="account-usage"
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <AccountUsage />
                        </motion.div>
                    )}




                    {/* Add other tabs here */}
                </AnimatePresence>
            </div>
        </>
    )
}
export default TabContent