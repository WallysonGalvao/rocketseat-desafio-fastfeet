export const cpfMask = value => {
    if (value.length === 8)
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(\d{3})(\d{3})/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    return value;
};
