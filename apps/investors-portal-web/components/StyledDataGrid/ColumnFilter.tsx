// import { MenuItem, Popover, Stack, TextField, Typography } from '@mui/material';
// import Select from '@mui/material/Select';
// import {
//   DataGridProps,
//   GridFilterItem,
//   GridValidRowModel,
// } from '@mui/x-data-grid';
// import { ArrowDropDownIcon } from '@mui/x-date-pickers';
// import { Dispatch, FC, SetStateAction, useState } from 'react';
// import Box from '../Box/Box';
// import { HStack } from '../Stack/Stack';
// import { LiteralUnion } from 'type-fest';
// import { CustomFilterModel } from '../../hooks/use-grid-filter';

// export type ColumnFilterTypeProps =
//   | { type: 'select'; options: { label: string; value: string }[] }
//   | {
//       type: 'textSearch';
//       placeholder?: string;
//       inputLabel?: string;
//       operator?: string;
//     };

// export interface ColumnFilterProps<R extends GridValidRowModel = any>
//   extends CustomFilterModel {
//   label: string;
//   column: LiteralUnion<keyof R, string>;
//   emptyValue?: string;
//   type: ColumnFilterTypeProps;
// }

// const ColumnFilter = <R extends DataGridProps = any>({
//   column,
//   label,
//   emptyValue,
//   applyFilter,
//   applyQuickFilter,
//   filterModel,
//   filterItems,
//   type,
//   ...props
// }: ColumnFilterProps<R>) => {
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   const filterValue = filterItems?.find(
//     (f) => f?.columnField === column
//   )?.value;

//   return (
//     <HStack align="center" h="38px" gap={0}>
//       <Stack
//         bgcolor="#F9F9F9"
//         height="100%"
//         alignItems="center"
//         justifyContent="center"
//         px={1}
//         border="1px solid #E5E7EB"
//         borderRight="none"
//       >
//         <Typography variant="p3" color="#8a8a8a">
//           {label}
//         </Typography>
//       </Stack>

//       <Box h="100%" color="ActiveCaption" fontSize="14px">
//         {type.type === 'select' && (
//           <Select
//             MenuProps={{
//               slotProps: {},
//             }}
//             sx={{
//               borderRadius: 0,
//             }}
//             displayEmpty
//             value={filterValue || ''}
//             onChange={(event) => {
//               applyFilter([
//                 {
//                   id: `${column as string}-${type}-${event.target.value}`,
//                   columnField: column as string,
//                   operatorValue: 'equals',
//                   value: event.target.value,
//                 },
//               ]);
//             }}
//           >
//             <MenuItem value="">{emptyValue || 'All'}</MenuItem>

//             {type.options.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </Select>
//         )}

//         {type.type === 'textSearch' && (
//           <>
//             <HStack
//               justify="center"
//               alignItems="center"
//               minWidth="62px"
//               h="100%"
//               border="1px solid #E5E7EB"
//               px={1}
//               onClick={(e) => setAnchorEl(e.currentTarget)}
//               sx={{
//                 cursor: 'pointer',
//                 color: 'inherit',
//               }}
//             >
//               {filterValue || emptyValue || 'Any'}
//               <ArrowDropDownIcon sx={{ color: 'inherit' }} />
//             </HStack>

//             <Popover
//               open={!!anchorEl}
//               anchorEl={anchorEl}
//               onClose={() => setAnchorEl(null)}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//             >
//               <Box p={'12px'}>
//                 <Typography variant="p3" fontWeight="500" mb={1}>
//                   {type.inputLabel || `Search by ${label}`}
//                 </Typography>

//                 <HStack align="center" gap={0.5}>
//                   <Typography variant="p3">is equal to </Typography>

//                   <TextField
//                     placeholder="Search email"
//                     size="small"
//                     InputProps={{ sx: { height: 25, fontSize: '14px' } }}
//                     value={filterValue || ''}
//                     onChange={(event) => {
//                       event.stopPropagation();

//                       applyFilter([
//                         {
//                           columnField: column as string,
//                           operatorValue: 'contains',
//                           value: event.target.value,
//                         },
//                       ]);
//                     }}
//                   />
//                 </HStack>
//               </Box>
//             </Popover>
//           </>
//         )}
//       </Box>
//     </HStack>
//   );
// };

// const ColumnFilterValueLabel: FC<any> = (props) => {
//   return <></>;
// };

// export default ColumnFilter;
