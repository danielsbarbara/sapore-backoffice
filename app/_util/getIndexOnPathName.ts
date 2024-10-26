export const getIndexOfPathName = (pathName: string): number => {
    if(pathName === '/menu-semanal') return 0
    if(pathName === '/menu') return 1
    if(pathName === '/sobremesas') return 2
    if(pathName === '/vinhos') return 3
    if(pathName === '/bebidas') return 4
    return -1
}