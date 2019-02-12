import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const GoogleAutoComplete = ({
  address,
  addressChange,
  handleSelect,
  placeholder,
  label,
  disabled,
}) => {
  return (
    <PlacesAutocomplete
      value={address}
      onChange={addressChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ position: 'relative', width: '100%' }}>
          <TextField
            className=""
            id="address"
            label={label}
            placeholder={placeholder}
            fullWidth
            style={{ marginTop: 2 }}
            {...getInputProps()}
            disabled={disabled}
          />
          <div style={{ position: 'absolute', top: 52, zIndex: 100 }}>
            {loading && (
              <div className="loader-view">
                <CircularProgress />
              </div>
            )}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#e0e0e0', cursor: 'pointer', padding: 6 }
                : {
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    padding: 6,
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default GoogleAutoComplete;
