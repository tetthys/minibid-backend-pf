import QueueSingleton from "../../queue/singletone/QueueSingleton";
import SchedulerSingletone from "../../scheduler/singletone/SchedulerSingletone";
import AccessToken from "../AccessToken/AccessToken";
import Auth from "../Auth/Auth";
import Balance from "../Balance/Balance";
import Cache from "../Cache/Cache";
import RedisSingletone from "../Cache/lib/Redis/singletone/RedisSingletone";
import Currency from "../Currency/Currency";
import EmailCode from "../EmailCode/EmailCode";
import Log from "../Log/Log";
import Password from "../Password/Password";
import PhoneNumberCode from "../PhoneNumberCode/PhoneNumberCode";
import WSC from "../WSC/WSC";

export default class Haven {
  public static WSC() {
    return new WSC();
  }

  public static AccessToken() {
    return new AccessToken();
  }

  public static Password() {
    return new Password();
  }

  public static Currency() {
    return new Currency();
  }

  public static Log() {
    return new Log();
  }

  public static Cache() {
    return new Cache();
  }

  public static EmailCode() {
    return new EmailCode();
  }

  public static PhoneNumberCode() {
    return new PhoneNumberCode();
  }

  public static Balance() {
    return new Balance();
  }

  public static Auth() {
    return new Auth();
  }

  public static Queue() {
    return QueueSingleton.getInstance();
  }

  public static Scheduler() {
    return SchedulerSingletone.getInstance();
  }

  public static Redis() {
    return RedisSingletone.getInstance();
  }
}
