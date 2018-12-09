import AeonSearch from './AeonSearch';
import IyecSearch from './IyecSearch';
import TajimaSearch from './TajimaSearch';
import LohacoSearch from './LohacoSearch';
import CoopSearch from './CoopSearch';
import KokubuSearch from './KokubuSearch';

export default {
  kokubu: (...args) => new IyecSearch(...args),
  aeon: (...args) => new AeonSearch(...args),
  tajima: (...args) => new TajimaSearch(...args),
  lohaco: (...args) => new LohacoSearch(...args),
  coop: (...args) => new CoopSearch(...args),
  kokubu: (...args) => new KokubuSearch(...args),
};
