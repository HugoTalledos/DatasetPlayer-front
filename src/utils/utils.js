export default class Utils {
  static validateField(data, action) {
    const {
      documentNumber, listFiles, separator,
      decimalSeparator, metric, unity, columns,
      name, age, weight, sex, experience,
      efectivity, columnTime, gestureType
    } = data;

    switch (action) {
      case 'clear':
        return (!documentNumber || documentNumber === 0);
      case 'graph':
        return (!documentNumber || documentNumber.length === 0
          || !listFiles || listFiles.length === 0
          || !separator || separator.length === 0
          || !decimalSeparator || decimalSeparator.length === 0
          || !metric || metric.length === 0
          || !unity || unity.length === 0
          || !columns || columns.length === 0);
      default:
        return (!documentNumber || documentNumber === 0
          || !name || name.length === 0
          || !age || age.length === 0
          || !weight || weight.length === 0
          || !sex || sex.length === 0
          || !experience || experience.length === 0
          || !efectivity || efectivity.length === 0
          || !listFiles || listFiles.length === 0
          || !separator || separator.length === 0
          || !decimalSeparator || decimalSeparator.length === 0
          || !metric || metric.length === 0
          || !unity || unity.length === 0 
          || !columns || columns.length === 0
          || !columnTime || columnTime.length === 0
          || !gestureType || gestureType.length === 0
          );
    }  
  }

  static logOut (firestoreRef) {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      localStorage.removeItem('mail');
      localStorage.removeItem('userName');
      firestoreRef.auth().signOut();
      window.location.href = '/';
    } catch (e) { // an error
    }
  }
}