import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./tooltip.module.scss";

const TooltipWrapper = ({
    content,
    children,
}: {
    content: string;
    children: React.ReactNode;
}) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className={styles.tooltipContent}
                        side="top"
                        sideOffset={5}
                    >
                        {content}
                        <Tooltip.Arrow className={styles.tooltipArrow} />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default TooltipWrapper;
