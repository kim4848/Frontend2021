import ToggleButton from "./ToggleButton";
import InputBox from "./InputBox";
import { useState } from "react";
import GetToken, { PutLicense } from "./../ApiClients/LicenseClient";
import { BackspaceIcon, SaveIcon } from "@heroicons/react/solid";
import Notification from "./Notification";

export default function License(props) {
  const [notify, setNotify] = useState(null);
  const [token, setToken] = useState(undefined);
  GetToken().then((x) => setToken(x));

  const update = () => {
    PutLicense(props.license, token).then((r) => {
      setNotify("Saved");

      setTimeout(() => {
        setNotify(null);
      }, 2000);
    });
  };

  const Temp = (props) => {
    const list = [];
    for (var propertyName in props.items) {
      list.push(propertyName);
    }

    return list.map((name, index) => {
      return (
        <div className="">
          {" "}
          <ToggleButton
            text={name}
            key={name + index}
            onChange={(value) => (props.items[name] = value)}
            checked={props.items[name]}
          ></ToggleButton>
        </div>
      );
    });
  };

  return (
    <div className="w-full pt-10">
      <Notification show={notify ? true : false} />

      <button
        onClick={() => props.onBackBlick()}
        type="button"
        className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-base font-sm rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <BackspaceIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        Back
      </button>

      <button
        onClick={() => update()}
        type="button"
        className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-base font-sm rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <SaveIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        Save
      </button>
      <div className="flex w-full mt-3">
        <InputBox
          className="flex-auto pr-3"
          headLine="Company name"
          text={props.license.companyName}
        ></InputBox>
        <InputBox
          className="flex-auto pr-3"
          headLine="Id"
          text={props.license.id}
        ></InputBox>
      </div>
      <div className="flex w-full mt-3">
        <InputBox
          className="flex-auto pr-3"
          headLine="Domain name"
          text={props.license.domainName}
          onChange={(e) => (props.license.domainName = e.target.value)}
        ></InputBox>
        <InputBox
          className="flex-auto pr-3"
          headLine="Experation date"
          text={props.experationDate}
        ></InputBox>
      </div>
      <div className="flex w-full mt-3">
        <InputBox
          className="flex-auto pr-3"
          headLine="Cloud licenses"
          text={props.license.allowedClientUsers}
        ></InputBox>
        <InputBox
          className="flex-auto pr-3"
          headLine="Onprem licenses"
          text={props.license.allowedCloudUsers}
        ></InputBox>
      </div>
      <div className="mt-5">
        <div className="pb-2 mb-3 mt-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">ESDH</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Temp items={props.license.includedFeatures.esdhIntegrations} />
        </div>

        <div className="pb-2 mb-3 mt-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Standard
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Temp items={props.license.includedFeatures.standardFeatures} />
        </div>

        <div className="pb-2 mb-3 mt-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Lookup integration
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Temp items={props.license.includedFeatures.lookupIntegrations} />
        </div>

        <div className="pb-2 mb-3 mt-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Output Management Integrations
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Temp
            items={props.license.includedFeatures.outputManagementIntegrations}
          />
        </div>

        <div className="pb-2 mb-3 mt-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Addons
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Temp items={props.license.includedFeatures.addons} />
        </div>
      </div>
    </div>
  );
}
