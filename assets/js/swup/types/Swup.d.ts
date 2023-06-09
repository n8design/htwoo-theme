import delegate from 'delegate-it';
import { Unsubscribe } from './helpers/delegateEvent';
import { Cache } from './modules/Cache';
import { getAnimationPromises } from './modules/getAnimationPromises';
import { fetchPage } from './modules/fetchPage';
import { loadPage, performPageLoad } from './modules/loadPage';
import { on, off, triggerEvent, Handlers } from './modules/events';
import { unuse, findPlugin, Plugin } from './modules/plugins';
import { updateTransition, shouldSkipTransition } from './modules/transitions';
export type Transition = {
    from?: string;
    to?: string;
    custom?: string;
};
type DelegatedListeners = {
    click?: Unsubscribe;
};
export type Options = {
    animateHistoryBrowsing: boolean;
    animationSelector: string | false;
    linkSelector: string;
    cache: boolean;
    containers: string[];
    requestHeaders: Record<string, string>;
    plugins: Plugin[];
    skipPopStateHandling: (event: any) => boolean;
    ignoreVisit: (url: string, { el, event }: {
        el?: Element;
        event?: Event;
    }) => boolean;
    resolveUrl: (url: string) => string;
};
export default class Swup {
    version: string;
    _handlers: Handlers;
    scrollToElement: string | null;
    options: Options;
    plugins: Plugin[];
    transition: Transition;
    cache: Cache;
    currentPageUrl: string;
    delegatedListeners: DelegatedListeners;
    boundPopStateHandler: (event: PopStateEvent) => void;
    loadPage: typeof loadPage;
    performPageLoad: typeof performPageLoad;
    leavePage: (this: Swup, { event, skipTransition }?: import("./modules/renderPage").PageRenderOptions) => Promise<void>[];
    renderPage: (this: Swup, page: import("./modules/Cache").PageRecord, { event, skipTransition }?: import("./modules/renderPage").PageRenderOptions) => void;
    replaceContent: ({ blocks, title }: {
        blocks: string[];
        title: string;
    }) => Promise<void>;
    enterPage: (this: Swup, { event, skipTransition }?: import("./modules/renderPage").PageRenderOptions) => Promise<void>[];
    triggerEvent: typeof triggerEvent;
    delegateEvent: <Selector extends string, TEvent extends keyof GlobalEventHandlersEventMap>(selector: Selector, type: TEvent, callback: delegate.EventHandler<GlobalEventHandlersEventMap[TEvent], Element>, { base, ...eventOptions }?: {
        base?: Document | undefined;
    }) => Unsubscribe;
    on: typeof on;
    off: typeof off;
    updateTransition: typeof updateTransition;
    shouldSkipTransition: typeof shouldSkipTransition;
    getAnimationPromises: typeof getAnimationPromises;
    getPageData: (this: Swup, request: XMLHttpRequest) => import("./modules/getPageData").PageData | null;
    fetchPage: typeof fetchPage;
    getAnchorElement: (hash: string) => Element | null;
    log: (message: string, context?: any) => void;
    use: (this: Swup, plugin: unknown) => Plugin[] | undefined;
    unuse: typeof unuse;
    findPlugin: typeof findPlugin;
    getCurrentUrl: ({ hash }?: {
        hash?: boolean | undefined;
    }) => string;
    cleanupAnimationClasses: () => void;
    defaults: Options;
    constructor(options?: Partial<Options>);
    enable(): void;
    destroy(): void;
    shouldIgnoreVisit(href: string, { el, event }?: {
        el?: Element;
        event?: Event;
    }): boolean;
    linkClickHandler(event: delegate.Event<MouseEvent>): void;
    handleLinkToSamePage(url: string, hash: string, event: delegate.Event<MouseEvent>): void;
    triggerWillOpenNewWindow(triggerEl: Element): boolean;
    popStateHandler(event: PopStateEvent): void;
    /**
     * Utility function to validate and run the global option 'resolveUrl'
     * @param {string} url
     * @returns {string} the resolved url
     */
    resolveUrl(url: string): string;
    /**
     * Compares the resolved version of two paths and returns true if they are the same
     * @param {string} url1
     * @param {string} url2
     * @returns {boolean}
     */
    isSameResolvedUrl(url1: string, url2: string): boolean;
}
export {};
