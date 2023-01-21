import React from "react";

export function MainButton({ onClick, disabled, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex rounded-md shadow disabled:opacity-50`}
    >
      <span
        className={`inline-flex items-center justify-center px-5 py-3 border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700`}
      >
        {label}
      </span>
    </button>
  );
}

export function AddressInput({ id, label, value, onChange, onBlur, error }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={`address-${id}`}>{label}</label>
      <input
        id={`address-${id}`}
        value={value}
        type="text"
        onChange={(event) => onChange(event.target.value)}
        onBlur={(event) => onBlur(event.target.value)}
        className={"form-input rounded px-4 py-3"}
        placeholder="Wallet Address"
      />
      {error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : (
        <p className="text-sm">&nbsp;</p>
      )}
    </div>
  );
}

export function SplitInput({ id, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={`split-${id}`}>Split</label>
      <input
        id={`split-${id}`}
        value={value}
        type="number"
        onChange={(event) => onChange(Number(event.target.value))}
        className={"form-input rounded px-4 py-3"}
        placeholder={1}
        min={1}
        step={1}
      />
    </div>
  );
}

export function PartnerInput({ address, split }) {
  return (
    <div className={"flex"}>
      <div className={"mr-3 w-full"}>
        <AddressInput
          id={address.id}
          label={address.label}
          value={address.value}
          onChange={address.onChange}
          onBlur={address.onBlur}
          error={address.error}
        />
      </div>
      <div className={"w-1/5"}>
        <SplitInput
          id={split.id}
          value={split.value}
          onChange={split.onChange}
        />
      </div>
    </div>
  );
}
