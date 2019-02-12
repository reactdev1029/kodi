import React from 'react';
import Input from '@material-ui/core/Input';
import SearchButton from 'components/SearchButton';

const SearchBox = ({
  styleName,
  handleChange,
  searchLoader,
  keywords,
  getKeyword,
}) => {
  return (
    <div className={`search-bar bg-transparent ${styleName}`}>
      <div className="d-flex flex-row">
        <div className="p-1 w-100 bg-white btn-left-radius">
          <Input
            margin="none"
            type="text"
            fullWidth
            placeholder="Search: e.g. Excavator"
            disableUnderline={true}
            value={keywords}
            onChange={event => getKeyword(event.target.value)}
          />
        </div>
        <SearchButton
          handleChange={() => handleChange()}
          classes={['size-60', 'zmdi-hc-3x']}
          loader={searchLoader}
        />
      </div>
    </div>
  );
};
export default SearchBox;

SearchBox.defaultProps = {
  styleName: '',
  value: '',
};
