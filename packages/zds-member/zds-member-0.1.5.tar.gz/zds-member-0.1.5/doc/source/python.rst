Undocumented Python objects
===========================
member.forms
------------
Classes:
 * ChangePasswordForm
 * ChangeUserForm -- missing methods:

   - clean
   - throw_error
 * KarmaForm
 * NewPasswordForm -- missing methods:

   - clean
 * RegisterForm -- missing methods:

   - throw_error
 * UsernameAndEmailForm

member.models
-------------
Classes:
 * KarmaNote -- missing methods:

   - get_next_by_create_at
   - get_previous_by_create_at
 * TokenForgotPassword -- missing methods:

   - get_next_by_date_end
   - get_previous_by_date_end
 * TokenRegister -- missing methods:

   - get_next_by_date_end
   - get_previous_by_date_end

member.views
------------
Classes:
 * MemberDetail -- missing methods:

   - get_context_data
   - get_object
 * RegisterView -- missing methods:

   - form_valid
   - get_form
   - get_object
   - get_success_template
   - post
 * SendValidationEmailView -- missing methods:

   - form_valid
   - get_error_message
   - get_form
   - get_success_template
   - get_user
   - post
 * UpdateMember -- missing methods:

   - dispatch
   - form_valid
   - get_error_message
   - get_form
   - get_object
   - get_success_message
   - get_success_url
   - post
   - save_profile
   - update_profile
 * UpdatePasswordMember -- missing methods:

   - get_form
   - get_success_message
   - get_success_url
   - post
   - update_profile
 * UpdateUsernameEmailMember -- missing methods:

   - get_form
   - get_success_url
   - update_profile

