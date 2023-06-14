import { useSelector, useDispatch } from 'react-redux';
import { Wrapper, Label, SearchInput } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';
import * as selectors from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectors.getFilter);
  const handleChangeFilter = event => {
    dispatch(setFilter(event.currentTarget.value));
  };

  return (
    <Wrapper>
      <Label htmlFor="">
        Search name
        <SearchInput
          onChange={handleChangeFilter}
          value={filter}
          placeholder="Search"
        />
      </Label>
    </Wrapper>
  );
};
