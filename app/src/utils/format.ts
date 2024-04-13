export const truncateAddress = (address: string, length = 4) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export const extractDomainName = (url: string): string => {
  const domain = new URL(url).hostname;
  const domainParts = domain.split('.');
  return domainParts[domainParts.length - 2];
}

export const extractDomain = (url: string): string => {
  return new URL(url).hostname;
}