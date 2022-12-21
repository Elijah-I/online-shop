interface IHeadStyle {
    clearHeadStyle: () => void;
    getHeadStyle: () => HTMLStyleElement;
}

export const headStyle: IHeadStyle = {
    clearHeadStyle() {
        const headStyle = document.getElementsByTagName("style");

        if (headStyle) {
            for (const headStyleElement of headStyle) {
                headStyleElement.parentNode?.removeChild(headStyleElement);
            }
        }
    },

    getHeadStyle() {
        return document.head.appendChild(
            document.createElement("style")
        );
    }
}
