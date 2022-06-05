import _helmet from 'helmet';

const helmetOpt = {
  contentSecurityPolicy: false,
};

export default function helmet() {
  return _helmet(helmetOpt);
}
