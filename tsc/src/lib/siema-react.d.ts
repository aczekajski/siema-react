import React from 'react';
import SiemaBase, { SiemaOptions } from 'siema';
export declare type Diff<T, U> = T extends U ? never : T;
export declare type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
export declare type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;
export declare type SiemaReactProps = Omit<SiemaOptions, 'selector'> & {
    clickable?: boolean;
    children?: React.ReactNode[];
    className?: string;
};
declare class Siema extends React.PureComponent<SiemaReactProps> {
    private siemaWrapper;
    private siemaInstance;
    private slides;
    private portals;
    private options;
    prev: SiemaBase['prev'];
    next: SiemaBase['next'];
    goTo: SiemaBase['goTo'];
    recalculateSizes: () => void;
    constructor(props: SiemaReactProps);
    private getSiemaWrapperRef;
    private addClickEventForClickable;
    private updatePortals;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    wrapSlide: (slide: any, key: any) => JSX.Element;
    renderIntoPortal: (slide: any, i: any) => React.ReactPortal;
    render(): JSX.Element;
}
export default Siema;
