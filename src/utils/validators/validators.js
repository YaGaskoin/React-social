export const requiredField = value => {
    if (value) return undefined;
    return 'Field is required'
}

export const maxLength = (length) => {
    return (value) => {
        if (value && value.length > length) return 'Max length is ' + length + 'symbols';
        return undefined;
    }
}

export const isUrl = (value) => {
    if(value && !(value.includes('http://') || value.includes('https://'))){
        return 'Value must contains http:// or https://'
    }
    return undefined;
}