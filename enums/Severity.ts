export enum Severity{
    // critical functionality broken
    BLOCKER = "blocker",
    // major feature broken: high business impact;
    CRITICAL = "critical",
    // standard severity for most functional tests
    NORMAL = "normal",
    //small issue: minimal impact
    MINOR = "minor",
    //cosmetic or low impact issue
    TRIVIAL = 'trivial'
}