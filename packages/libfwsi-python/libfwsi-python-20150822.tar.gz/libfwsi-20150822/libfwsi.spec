Name: libfwsi
Version: 20150822
Release: 1
Summary: Library to access the Windows Shell Item format
Group: System Environment/Libraries
License: LGPL
Source: %{name}-%{version}.tar.gz
URL: https://github.com/libyal/libfwsi/
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
          
          

%description
libfwsi is a library to access the Windows Shell Item format

%package devel
Summary: Header files and libraries for developing applications for libfwsi
Group: Development/Libraries
Requires: libfwsi = %{version}-%{release}

%description devel
Header files and libraries for developing applications for libfwsi.

%package python
Summary: Python bindings for libfwsi
Group: System Environment/Libraries
Requires: libfwsi = %{version}-%{release} python
BuildRequires: python-devel

%description python
Python bindings for libfwsi

%prep
%setup -q

%build
%configure --prefix=/usr --libdir=%{_libdir} --mandir=%{_mandir} --enable-python
make %{?_smp_mflags}

%install
rm -rf ${RPM_BUILD_ROOT}
make DESTDIR=${RPM_BUILD_ROOT} install

%clean
rm -rf ${RPM_BUILD_ROOT}

%post -p /sbin/ldconfig

%postun -p /sbin/ldconfig

%files
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%attr(755,root,root) %{_libdir}/*.so.*

%files devel
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README ChangeLog
%{_libdir}/*.a
%{_libdir}/*.la
%{_libdir}/*.so
%{_libdir}/pkgconfig/libfwsi.pc
%{_includedir}/*
%{_mandir}/man3/*

%files python
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%{_libdir}/python*/site-packages/*.a
%{_libdir}/python*/site-packages/*.la
%{_libdir}/python*/site-packages/*.so

%changelog
* Fri Oct  9 2015 Joachim Metz <joachim.metz@gmail.com> 20150822-1
- Auto-generated

