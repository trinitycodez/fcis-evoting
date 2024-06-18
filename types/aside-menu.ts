export interface propsType {
    value?: boolean,
    stateToggle: (val: boolean) => void,
    stateModal: (val: boolean, numChange: string) => void
}