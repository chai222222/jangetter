import AeonSearch from './AeonSearch';
import IyecSearch from './IyecSearch';
import TajimaSearch from './TajimaSearch';
import LohacoSearch from './LohacoSearch';
import CoopSearch from './CoopSearch';
import KokubuSearch from './KokubuSearch';
import MogunaviSearch from './MogunaviSearch';
import KenkocomSearch from './KenkocomSearch';
import CreateSdSearch from './CreateSdSearch';
import MorinagaSearch from './MorinagaSearch';
import SunyoSearch from './SunyoSearch';

export default {
  iyec: (...args) => new IyecSearch(...args),
  aeon: (...args) => new AeonSearch(...args),
  tajima: (...args) => new TajimaSearch(...args),
  lohaco: (...args) => new LohacoSearch(...args),
  coop: (...args) => new CoopSearch(...args),
  kokubu: (...args) => new KokubuSearch(...args),
  mogunavi: (...args) => new MogunaviSearch(...args),
  kenkocom: (...args) => new KenkocomSearch(...args),
  createsd: (...args) => new CreateSdSearch(...args),
  morinaga: (...args) => new MorinagaSearch(...args),
  sunyo: (...args) => new SunyoSearch(...args),
};
