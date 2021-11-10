import { useState, useEffect } from "react";
import GetToken, {
  GetLicense,
  CreateLicense,
} from "./../ApiClients/LicenseClient";
import Table from "../components/Table";

import {
  SearchIcon,
  PlusIcon,
  SaveIcon,
  BackspaceIcon,
} from "@heroicons/react/solid";
import InputBox from "../components/InputBox";

export default function LicenseView(props) {
  const [data, setData] = useState({ original: [], filtered: [] });
  const [token, setToken] = useState(undefined);
  const [newCompanyname, setNewCompanyname] = useState("");
  const [showNewDialog, setShowNewDialog] = useState(false);

  GetToken().then((x) => setToken(x));

  useEffect(() => {
    console.log("RUN", token);
    GetLicense(token).then((x) => setData({ original: x, filtered: x }));
  }, [token]);

  const newInput = (e) => {
    if (e.target.value.length > 0) {
      var filtered = data.original.filter(function (el) {
        if (el.companyName)
          return (
            el.companyName
              .toLowerCase()
              .indexOf(e.target.value.toLowerCase()) !== -1
          );
      });
      setData({ original: data.original, filtered: filtered });
    } else {
      setData({ original: data.original, filtered: data.original });
    }
  };

  const create = () => {
    CreateLicense({ companyName: newCompanyname }, token).then((r) => {
      console.log(r);

      GetLicense(token)
        .then((x) => {
          setData({ original: x, filtered: x });

          return x;
        })
        .then((done) => {
          var newLicense = done.filter((e) => e.id === r.licenseId)[0];
          console.log(newLicense);

          props.onLicenseSlected(newLicense);
        });
    });
  };

  return (
    <div>
      {showNewDialog ? (
        <div className="mb-5 mt-3 border border-gray-300 p-3">
          <InputBox
            onChange={(e) => setNewCompanyname(e.target.value)}
            headLine="Company name"
          ></InputBox>
          <button
            onClick={() => setShowNewDialog(false)}
            type="button"
            className="inline-flex mb-3  mt-3 pr-2 items-center px-2 py-1 border border-transparent shadow-sm text-base font-sm rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <BackspaceIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Back
          </button>
          <button
            onClick={() => create()}
            type="button"
            className="inline-flex mb-3  mt-3 pr-2 items-center px-2 py-1 border border-transparent shadow-sm text-base font-sm rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <SaveIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Create
          </button>
        </div>
      ) : (
        <div className="border p-3 mt-3 mb-5">
          <div className="mb-3">
            <label
              htmlFor="search"
              className="block text-lg font-medium text-gray-700"
            >
              Quick search
            </label>
            <div className="mt-1 relative flex items-center">
              <input
                onChange={(e) => newInput(e)}
                type="text"
                name="search"
                id="search"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <SearchIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowNewDialog(true)}
            type="button"
            className="inline-flex mb-3  pr-2 items-center px-2 py-1 border border-transparent shadow-sm text-base font-sm rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New
          </button>
          <Table
            onSelect={(e) => props.onLicenseSlected(e)}
            licenses={data.filtered}
          ></Table>
        </div>
      )}
    </div>
  );
}
