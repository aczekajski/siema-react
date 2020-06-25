import React from 'react';
import ReactDOM from 'react-dom';
import SiemaBase, { SiemaOptions } from 'siema';
import memoize from 'memoize-one';

export type Diff<T, U> = T extends U ? never : T;
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
export type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

export type SiemaReactProps =
    Omit<SiemaOptions, 'selector'> & {
        clickable?: boolean;
        children?: React.ReactNode[];
        className?: string;
    };

class SiemaWrapper extends React.Component<{ innerRef: (el: HTMLElement) => void; className: string }> {
    // since all further children updates will be handled in "componentWillReceiveProps" of the main Siema component
    // we render this wrapper only once at the beginning for the slides to be visible in SSR output and for proper `hydrate` after that
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div ref={this.props.innerRef} className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

class Siema extends React.PureComponent<SiemaReactProps> {
    private siemaWrapper;
    private siemaInstance: SiemaBase;
    private slides: React.ComponentType[];
    private portals: Element[] = [];
    private options: SiemaOptions;

    public prev: SiemaBase['prev'] = (...args) => { this.siemaInstance.prev(...args); };
    public next: SiemaBase['next'] = (...args) => { this.siemaInstance.next(...args); };
    public goTo: SiemaBase['goTo'] = (...args) => { (this.siemaInstance.goTo as any)(...args); }; // TODO: improve types
    public resizeHandler = () => { (this.siemaInstance as any).resizeHandler(); }; // TODO: also improve types, or change siema to smth else

    constructor(props: SiemaReactProps) {
        super(props);

        const {
            // options
            duration = 200,
            easing = 'ease-out',
            perPage = 1,
            slideWidth = 0,
            mode = 'left',
            freeDrag = false,
            startIndex = 0,
            draggable = true,
            multipleDrag = true,
            threshold = 20,
            loop = false,
            overflowHidden = true,
            preventClickOnDrag = true,
            onInit = () => undefined,
            onChange = () => undefined,
            onDrag = () => undefined,
        } = this.props;

        this.options = {
            selector: null,
            duration,
            easing,
            perPage,
            slideWidth,
            mode,
            freeDrag,
            startIndex,
            draggable,
            multipleDrag,
            threshold,
            preventClickOnDrag,
            loop,
            overflowHidden,
            onInit,
            onChange,
            onDrag,
        };
    }

    private getSiemaWrapperRef = (element) => { this.siemaWrapper = element; };

    private addClickEventForClickable = memoize(
        (children, clickable: boolean) => {
            if (clickable) {
                this.options.preventClickOnDrag = true;
                return React.Children.map(children, (child, index) => {
                    let childNode: React.ReactElement<any>;
                    childNode =
                        (typeof child === 'string' || typeof child === 'number' || typeof child.type === 'undefined')
                            ? <div>{child}</div>
                            : child;
                    return React.cloneElement(childNode, {
                        onClick: (e) => {
                            if (typeof childNode.props.onClick === 'function') {
                                childNode.props.onClick(e);
                            }
                            this.goTo(index);
                        }
                    });
                });
            } else {
                return children;
            }
        }
    );

    private updatePortals() {
        if (this.siemaInstance) {
            // updating slides
            const oldPortalsNumber = this.portals.length;
            const oldSlidesNumber = this.siemaWrapper.children[0].children.length;
            const newSlidesNumber = this.slides.length;

            if (newSlidesNumber > oldSlidesNumber) {
                for (let i = oldSlidesNumber; i < newSlidesNumber; ++i) {
                    this.siemaInstance.append(document.createElement('div'));
                }
            } else if (newSlidesNumber < oldSlidesNumber) {
                for (let i = oldSlidesNumber - 1; i >= newSlidesNumber; --i) {
                    this.siemaInstance.remove(i);
                }
            }

            for (let i = 0; i < newSlidesNumber; ++i) {
                if (!this.portals[i]) {
                    const slideWrapper = this.siemaWrapper.children[0].children[i].children[0];
                    if (slideWrapper.children.length > 0) {
                        slideWrapper.removeChild(slideWrapper.children[0]);
                    }
                }
                this.portals[i] = this.siemaWrapper.children[0].children[i].children[0];
            }
            for (let i = newSlidesNumber; i < oldPortalsNumber; ++i) {
                this.portals.pop();
            }

            if (oldPortalsNumber !== this.portals.length) {
                this.forceUpdate();
            }
        }
    }

    public componentDidMount() {
        this.options.selector = this.siemaWrapper;
        this.siemaInstance = new SiemaBase(this.options);
        this.updatePortals(); // will cause rerender
    }

    public componentDidUpdate() {
        this.updatePortals(); // may cause rerender
    }

    public componentWillUnmount() {
        this.siemaInstance.destroy(false);
    }

    wrapSlide = (slide, key) => <div key={key}>{slide}</div>;
    renderIntoPortal = (slide, i) => ReactDOM.createPortal(slide, this.portals[i]);

    public render() {
        this.slides = this.addClickEventForClickable(this.props.children, this.props.clickable);
        return (
            <React.Fragment>
                <SiemaWrapper innerRef={this.getSiemaWrapperRef} className={this.props.className}>
                    {this.slides.map(this.wrapSlide)}
                </SiemaWrapper>
                {this.slides.length > 0 && this.portals.length > 0 && this.slides.slice(0, this.portals.length).map(this.renderIntoPortal)}
            </React.Fragment>
        );
    }
}

export default Siema;
