using Dapper;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface IGeneralGenericFunction
    {
        int GetTotalCount(string pWhere, string pTablename, string pColoumn);

        T GetField<T>(string pWhere, string pTablename, string pfilterColoumn);

        IEnumerable<T> GetAllField<T>(string pWhere, string pTablename, string pfilterColoumn);

        T ExecuteProcedure<T>(string procName, params DynamicParameters[] parameters);
    }
}